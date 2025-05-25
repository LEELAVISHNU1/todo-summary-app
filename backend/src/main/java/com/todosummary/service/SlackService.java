package com.todosummary.service;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class SlackService {
    @Value("${slack.webhook.url}")
    private String slackWebhookUrl;

    public void sendToSlack(String message) throws IOException {
        if (slackWebhookUrl == null || slackWebhookUrl.isEmpty()) {
            throw new IOException("Slack webhook URL is not configured");
        }

        OkHttpClient client = new OkHttpClient();

        MediaType mediaType = MediaType.parse("application/json");
        String requestBody = String.format("{\"text\":\"%s\"}", 
            message.replace("\"", "\\\"")
                  .replace("\n", "\\n"));

        RequestBody body = RequestBody.create(mediaType, requestBody);

        Request request = new Request.Builder()
                .url(slackWebhookUrl)
                .post(body)
                .addHeader("Content-type", "application/json")
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Slack API error: " + response.code() + " - " + response.body().string());
            }
        }
    }
}