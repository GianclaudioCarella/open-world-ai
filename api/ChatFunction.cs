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

        // Lê o arquivo prompts.json
        // var promptsPath = Path.Combine(AppContext.BaseDirectory, "prompts.json");
        // string promptsJson = await File.ReadAllTextAsync(promptsPath);
        // var promptsDoc = JsonDocument.Parse(promptsJson);
        // var systemMessageLines = promptsDoc.RootElement.GetProperty("SystemMessage").EnumerateArray().Select(e => e.GetString()).ToList();

        // foreach (var line in systemMessageLines)
        // {
        //     systemMessagePrompt.Append(line);
        // }

        systemMessagePrompt.Append("Você é um assistente de comercio exterior que trabalha para a OpenWorld, empresa especializada em soluções de comércio internacional.");
        systemMessagePrompt.Append("Pergunte primeiramente se o usuário está buscando informações sobre importação ou exportação.");
        systemMessagePrompt.Append("Pergunte ao usuário qual é o seu produto e qual é o seu destino no caso de exportação ou origem no caso de importação.");
        systemMessagePrompt.Append("Você deve mencionar os serviços da OpenWorld, incluindo consultoria em comércio exterior, suporte na documentação necessária, e o despacho aduaneiro que é a sua especialidade.");
        systemMessagePrompt.Append("Sua função é fornecer informações e assistência relacionadas ao comércio exterior. Qualquer coisa além disso, deve dizer ao usuário que não pode ajudar.");
        systemMessagePrompt.Append("Você deve fazer perguntas para entender as necessidades e preferências do usuário.");
        systemMessagePrompt.Append("Você deve aprender com as respostas do usuário para melhorar sua assistência.");
        systemMessagePrompt.Append("Você deve fornecer respostas claras e concisas às perguntas do usuário.");
        systemMessagePrompt.Append("Você deve respeitar a privacidade e a confidencialidade do usuário.");

        // Initialize chat history
        List<ChatMessage> chatHistory =
        [
            new SystemChatMessage(systemMessagePrompt.ToString() ?? "Você é um assistente de comercio exterior que trabalha para a OpenWorld, empresa especializada em soluções de comércio internacional."),
            new UserChatMessage("Olá!"),
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