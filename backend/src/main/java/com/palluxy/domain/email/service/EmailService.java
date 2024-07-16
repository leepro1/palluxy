package com.palluxy.domain.email.service;

import com.palluxy.domain.email.exception.EmailBadMessagingException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@RequiredArgsConstructor
@Service
public class EmailService {

    private final JavaMailSender emailSender;
    private final StringRedisTemplate redisTemplate;
    private static final long VERIFICATION_CODE_EXPIRATION = 20;

    private String generateVerificationCode() {
        Random random = new Random();
        return String.format("%06d", random.nextInt(1000000));
    }

    private String generateHtmlMessage(String subject, String code) {
        return "<!DOCTYPE html>\n" +
                "<html>\n" +
                "<head>\n" +
                "    <style>\n" +
                "        .email-container {\n" +
                "            font-family: Arial, sans-serif;\n" +
                "            padding: 20px;\n" +
                "            border: 1px solid #dddddd;\n" +
                "            border-radius: 5px;\n" +
                "            width: 500px;\n" +
                "            margin: auto;\n" +
                "        }\n" +
                "        .header {\n" +
                "            background-color: #4B4376;\n" +
                "            padding: 10px;\n" +
                "            color: white;\n" +
                "            text-align: center;\n" +
                "            font-size: 24px;\n" +
                "            font-weight: bold;\n" +
                "            border-bottom: 1px solid #dddddd;\n" +
                "        }\n" +
                "        .content {\n" +
                "            padding: 20px;\n" +
                "            text-align: center;\n" +
                "        }\n" +
                "        .code {\n" +
                "            font-size: 20px;\n" +
                "            font-weight: bold;\n" +
                "            color: #333333;\n" +
                "        }\n" +
                "    </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "    <div class=\"email-container\">\n" +
                "        <div class=\"header\">" + subject + "</div>\n" +
                "        <div class=\"content\">\n" +
                "            <p>Your PAL:LUXY code is:</p>\n" +
                "            <p class=\"code\">" + code + "</p>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }

    public void sendVerificationCode(String type, String to) {
        String subject = null;
        switch (type) {
            case "signup":
                subject = "PAL:LUXY 인증코드입니다.";
        }

        String code = generateVerificationCode();
        String htmlMsg = generateHtmlMessage(subject, code);
        try {
            sendHtmlEmail(to, subject, htmlMsg);
        } catch (MessagingException e) {
            throw new EmailBadMessagingException();
        }

        redisTemplate.opsForValue().set(to, code, VERIFICATION_CODE_EXPIRATION, TimeUnit.MINUTES);
    }

    private void sendHtmlEmail(String to, String subject, String htmlMsg) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlMsg, true);
        emailSender.send(message);
    }

    public void verifyCode(String email, String code) {
        String storedCode = redisTemplate.opsForValue().get(email);

        if (storedCode == null || !storedCode.equals(code)) {
            throw new EmailBadMessagingException();
        }
    }

}
