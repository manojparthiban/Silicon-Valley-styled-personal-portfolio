import React from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactSectionProps {
  onSubmit?: (data: z.infer<typeof formSchema>) => void;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const ContactSection = ({
  onSubmit = (data) => console.log("Form submitted:", data),
  socialLinks = {
    github: "https://github.com/manojparthiban",
    linkedin: "https://www.linkedin.com/in/manoj-parthi31",
    twitter: "https://twitter.com/ImMj31",
    email: "mailto:manojparthiban2002@gmail.com",
  },
}: ContactSectionProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
    <section className="min-h-screen bg-muted/50 py-24 px-4 relative overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out
            using the form below or through social media.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10">
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div className="text-lg font-semibold">Connect with me</div>
            <div className="flex flex-col space-y-4">
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open(socialLinks.github, "_blank")}
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open(socialLinks.linkedin, "_blank")}
              >
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open(socialLinks.twitter, "_blank")}
              >
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button
                variant="outline"
                className="justify-start"
                onClick={() => window.open(socialLinks.email)}
              >
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
