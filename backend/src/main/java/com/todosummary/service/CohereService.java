package com.todosummary.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.json.JSONArray;
import org.json.JSONObject;
import java.io.IOException;
import java.util.List;

@Service
public class CohereService {
    @Value("${cohere.api.key}")
    private String cohereApiKey;

    private static final String COHERE_API_URL = "https://api.cohere.ai/v1/generate";

    public String summarizeTodos(List<String> todos) throws IOException {
        if (todos.isEmpty()) {
            return "No pending todos to summarize!";
        }

        String prompt = "Summarize the following todo items in a concise, motivational way:\n\n" +
                String.join("\n", todos) +
                "\n\nSummary:";

        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json");
        
        // Properly formatted JSON request
        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "command");
        requestBody.put("prompt", prompt);
        requestBody.put("max_tokens", 200);
        requestBody.put("temperature", 0.7);
        requestBody.put("stop_sequences", new JSONArray().put("\n"));
        
        RequestBody body = RequestBody.create(
            mediaType, 
            requestBody.toString()
        );

        Request request = new Request.Builder()
                .url(COHERE_API_URL)
                .post(body)
                .addHeader("accept", "application/json")
                .addHeader("content-type", "application/json")
                .addHeader("authorization", "Bearer " + cohereApiKey)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response.code() + ": " + response.body().string());
            }
            
            // Parse the JSON response properly
            JSONObject jsonResponse = new JSONObject(response.body().string());
            return jsonResponse.getJSONArray("generations")
                    .getJSONObject(0)
                    .getString("text");
        }
    }
}