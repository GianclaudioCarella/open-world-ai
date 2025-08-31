using System.Text;
using System.Text.Json;
using Azure;
using Azure.AI.OpenAI;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using OpenAI.Chat;

namespace api;

public class ChatFunction
{
    private readonly ILogger<ChatFunction> _logger;
    private readonly IConfiguration _config;

    public ChatFunction(ILogger<ChatFunction> logger, IConfiguration config)
    {
        _logger = logger;
        _config = config;
    }

    public class ChatRequest
    {
        public string Message { get; set; }
    }

    public class ChatResponse
    {
        public string Sender { get; set; }
        public string Text { get; set; }
    }

    [Function("Chat")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post"),] HttpRequest req)
    {
        _logger.LogInformation("Received a chat message request.");

        var endpoint = new Uri(_config["AZURE_OPENAI_ENDPOINT"] ??
            throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is missing in configuration."));
        var deploymentName = _config["AZURE_OPENAI_CHAT_DEPLOYMENT"] ??
            throw new InvalidOperationException("AZURE_OPENAI_CHAT_DEPLOYMENT is missing in configuration.");
        var apiKey = _config["AZURE_OPENAI_KEY"] ??
            throw new InvalidOperationException("AZURE_OPENAI_KEY is missing in configuration.");

        using var reader = new StreamReader(req.Body);
        var requestBody = await reader.ReadToEndAsync();

        ChatRequest data;
        try
        {
            data = JsonSerializer.Deserialize<ChatRequest>(requestBody, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }
        catch (JsonException)
        {
            return new BadRequestObjectResult("Invalid JSON payload.");
        }

        var userMessage = data?.Message ?? string.Empty;


        AzureOpenAIClient azureClient = new(endpoint, new AzureKeyCredential(apiKey));
        ChatClient chatClient = azureClient.GetChatClient(deploymentName);

        // Read system message lines from prompts.json and join them
        //var systemMessageLines = _config.GetSection("SystemMessage").Get<string[]>();
        var systemMessagePrompt = new StringBuilder();

        // foreach (var line in systemMessageLines ?? [])
        // {
        //     systemMessagePrompt.Append(line);
        // }

        systemMessagePrompt.Append("You are a personal AI assistant.");
        systemMessagePrompt.Append("You are designed to help users with their tasks and provide information.");
        systemMessagePrompt.Append("You will interact with users in a friendly and helpful manner.");
        systemMessagePrompt.Append("You will ask questions to understand the user's needs and preferences.");
        systemMessagePrompt.Append("You will learn from the user's responses to improve your assistance.");
        systemMessagePrompt.Append("You will provide clear and concise answers to the user's questions.");
        systemMessagePrompt.Append("You will respect the user's privacy and confidentiality.");
        systemMessagePrompt.Append("You will ask the user name and store it for future interactions.");
        //systemMessagePrompt.Append("You will ask the user what name they want to give to you and store it for future interactions.");
        systemMessagePrompt.Append("You will ask the user what is your purpose and what should you learn to help them.");

        // Initialize chat history
        List<ChatMessage> chatHistory =
        [
            new SystemChatMessage(systemMessagePrompt.ToString() ?? "You are a personal AI assistant."),
            new UserChatMessage("Hello!"),
        ];

        chatHistory.Add(new UserChatMessage(userMessage));

        var chatResponse = chatClient.CompleteChat(chatHistory, new ChatCompletionOptions
        {
            Temperature = 0.75f,
            TopP = 1.0f,
            FrequencyPenalty = 0.0f,
            PresencePenalty = 0.0f,
        });

        var completeChatResponse = chatClient.CompleteChatStreaming(chatHistory);

        var sbResponse = new StringBuilder();

        foreach (StreamingChatCompletionUpdate update in completeChatResponse)
        {
            foreach (ChatMessageContentPart updatePart in update.ContentUpdate)
            {
                sbResponse.Append(updatePart.Text);
            }
        }

        var response = new ChatResponse
        {
            Sender = "bot",
            Text = $"\"{sbResponse.ToString()}\""
        };

        return new OkObjectResult(response);
    }
}