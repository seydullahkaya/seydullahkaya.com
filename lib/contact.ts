import { z } from "zod";

// İstemci ve sunucu aynı şemayı kullanır. Hata mesajları çeviri anahtarıdır.
export const contactTopics = ["website", "webapp", "mobile", "other"] as const;
export type ContactTopic = (typeof contactTopics)[number];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "nameRequired")
    .max(80, "nameTooLong")
    // Satır sonu yok: e-posta başlıklarına sızmasın
    .regex(/^[^\r\n]+$/, "nameInvalid"),
  email: z
    .string()
    .trim()
    .max(254, "emailInvalid")
    .pipe(z.email("emailInvalid")),
  topic: z.enum(contactTopics, "topicRequired"),
  message: z
    .string()
    .trim()
    .min(10, "messageTooShort")
    .max(4000, "messageTooLong"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactErrorKey =
  | "nameRequired"
  | "nameTooLong"
  | "nameInvalid"
  | "emailInvalid"
  | "topicRequired"
  | "messageTooShort"
  | "messageTooLong";

export type ContactState =
  | { status: "idle" }
  | { status: "success"; at: number }
  | {
      status: "error";
      at: number;
      error: "validation" | "spam" | "rateLimited" | "server";
      fieldErrors?: Partial<Record<ContactField, ContactErrorKey>>;
    };
