import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { fetchApiKeyLevel, fetchUserProfile } from "@/actions/api.actions";
import { useState } from "react";
import { RotateCw } from "lucide-react";

const formSchema = z.object({
  apiKey: z.string().length(16, {
    message: "API key must be 16 characters long",
  }),
});

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const apiKeyData = await fetchApiKeyLevel(data.apiKey);

      if (apiKeyData.access_level > 2) {
        const user = await fetchUserProfile(data.apiKey);
        await login({ ...apiKeyData, apiKey: data.apiKey }, user);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error checking API Key:", error);
      setIsLoading(false);
    }
  }
  return (
    <div className="flex w-full h-dvh items-center justify-center flex-col">
      <h1 className="mb-14">Tornalytics</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-96 text-center"
        >
          <FormField
            control={form.control}
            name="apiKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>API key</FormLabel>
                <FormControl>
                  <Input placeholder="API key" {...field} />
                </FormControl>
                <FormDescription className="mt-3">
                  You need at least{" "}
                  <span className="text-[#fcc419]">Limited Access</span> Level
                  API Key.
                  <br />
                  Don&#039;t have one? You can make one{" "}
                  <a
                    href="https://www.torn.com/preferences.php#tab=api"
                    className="underline text-foreground"
                    target="_blank"
                  >
                    here
                  </a>
                  .
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={`w-full`} disabled={isLoading}>
            {isLoading ? (
              <>
                <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                Please wait
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
