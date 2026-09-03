# WhatsApp Order Flow

ARG TopUp uses a zero-friction, direct-to-chat checkout model via WhatsApp.

## 1. Ordering Flow

1. Customer browses games at `/` or `/games`.
2. Customer selects a game (e.g., `/games/free-fire`).
3. Customer picks a package and clicks **Buy via WhatsApp**.
4. The system invokes `buildWhatsAppUrl()` in `src/lib/whatsapp.ts`.
5. Customer is redirected directly into a pre-filled WhatsApp chat with the merchant.

## 2. Message Format

```
Hi! I want to order:
[Game Name] – [Package Amount]
Price: Rs. [Price]

Please confirm.
```

## 3. Configuration

The merchant recipient phone number is managed dynamically:
- Default fallback from `WHATSAPP_NUMBER` in environment variables.
- Dynamic overrides stored in database via `SiteSettings.whatsappNumber` editable at `/admin/settings`.
- Numbers are sanitized to E.164 digits without plus signs or spaces (e.g., `9779863912884`).
