using api.plugins;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.OpenAI;

var builder = FunctionsApplication.CreateBuilder(args);

// Add configuration settings
builder.Configuration
    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables();

//Add Semantic Kernel
var kernelBuilder = builder.Services.AddKernel();

// Register plugins
kernelBuilder.Plugins.AddFromType<GetDateTime>();

//var kernel = builder.Services.BuildServiceProvider().GetRequiredService<Kernel>();

// var kernelPlugin = await kernel.ImportPluginFromOpenApiAsync(
//          pluginName: "customers",
//          uri: new Uri("https://customerapi--qz3x3br.internal.mangopond-8de2dfc6.eastus2.azurecontainerapps.io/swagger/v1/swagger.json")
//          );
//         builder.Services.AddSingleton(kernelPlugin);

//Add Azure OpenAI Service
// builder.Services.AddAzureOpenAIChatCompletion(
//     deploymentName: builder.Configuration["AZURE_OPENAI_CHAT_DEPLOYMENT"],
//     endpoint: builder.Configuration["AZURE_OPENAI_ENDPOINT"],
//     apiKey: builder.Configuration["AZURE_OPENAI_KEY"]);

// Enable concurrent invocation of functions to get the latest news and the current time.
//FunctionChoiceBehaviorOptions options = new() { AllowConcurrentInvocation = true };

// Configure prompt execution settings
// builder.Services.AddTransient<PromptExecutionSettings>( _ => new OpenAIPromptExecutionSettings {
//     Temperature = 0.75,
//     FunctionChoiceBehavior = FunctionChoiceBehavior.Auto(options: options)
// });

builder.ConfigureFunctionsWebApplication();

builder.Services
    .AddApplicationInsightsTelemetryWorkerService()
    .ConfigureFunctionsApplicationInsights();

builder.Build().Run();
