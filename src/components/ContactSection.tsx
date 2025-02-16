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

// Form validation schema using Zod
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

interface ContactSectionProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const ContactSection = ({
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

  // Form Submission Handler - Integrates with Formspree
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const response = await fetch("https://formspree.io/f/movqownb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully! ✅");
        form.reset(); // Reset form on success
      } else {
        alert("Failed to send message. Please try again. ❌");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

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
          {/* Contact Form */}
          <Card className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 p-6">
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
                            {...field} 
                            className="bg-primary/5 border-primary/20 focus:border-primary/30 transition-colors"
                          />
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
                        <FormLabel className="text-primary">Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field} 
                            className="bg-primary/5 border-primary/20 focus:border-primary/30 transition-colors"
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
                        <FormLabel className="text-primary">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message"
                            className="min-h-[150px] bg-primary/5 border-primary/20 focus:border-primary/30 transition-colors"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="bg-gradient-to-br from-card/50 to-card/30 dark:from-card/30 dark:to-card/10 backdrop-blur-lg border border-primary/20 dark:border-primary/10 shadow-md hover:shadow-lg shadow-black/5 hover:shadow-black/10 dark:shadow-none dark:hover:shadow-lg dark:hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 p-6">
            <CardContent className="space-y-8">
              <div className="text-lg font-semibold text-primary">Connect with me</div>
              <div className="flex flex-col space-y-4">
                <Button
                  variant="outline"
                  className="justify-start border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => window.open(socialLinks.github, "_blank")}
                >
                  <Github className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => window.open(socialLinks.linkedin, "_blank")}
                >
                  <Linkedin className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => window.open(socialLinks.twitter, "_blank")}
                >
                  <Twitter className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Twitter
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-primary/20 hover:bg-primary/10 hover:text-primary transition-colors group"
                  onClick={() => window.open(socialLinks.email)}
                >
                  <Mail className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
