import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  subject: z.string().min(1, "Assunto é obrigatório"),
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres"),
});

type FormData = z.infer<typeof schema>;

const ContactForm = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await emailjs.send(
        // TODO: Replace with your actual EmailJS credentials
        "service_y19gxjf",
        "template_uvqief8",
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        },
        "HohWLELMkH1nkYmSO",
      );
      setSent(true);
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl bg-muted/50 border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-[500px] mx-auto"
    >
      <div className="glass rounded-2xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground">Mensagem enviada com sucesso!</h3>
              <p className="text-muted-foreground mt-2">Responderei em breve.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Vamos conversar?</h2>
              </div>
              <p className="text-sm text-muted-foreground -mt-3">
                Preencha o formulário e entrarei em contato em breve.
              </p>

              <div>
                <input {...register("name")} placeholder="Nome" className={inputClass} id="name" aria-label="Nome" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <input
                  {...register("email")}
                  placeholder="E-mail"
                  type="email"
                  className={inputClass}
                  id="email"
                  aria-label="E-mail"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <input
                  {...register("subject")}
                  placeholder="Assunto"
                  className={inputClass}
                  id="subject"
                  aria-label="Assunto"
                />
                {errors.subject && <p className="text-xs text-destructive mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <textarea
                  {...register("message")}
                  placeholder="Mensagem"
                  rows={5}
                  className={`${inputClass} resize-none`}
                  id="message"
                  aria-label="Mensagem"
                />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3 px-6 font-medium text-sm transition hover:opacity-90 disabled:opacity-60 min-h-[44px]"
                aria-label="Enviar mensagem"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ContactForm;
