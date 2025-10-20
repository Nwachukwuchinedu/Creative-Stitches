"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Loader2, AlertCircle } from "lucide-react";

type StyleAdvisorState = {
  styleRecommendations: string;
  error?: string;
};

const initialState: StyleAdvisorState = {
  styleRecommendations: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Get Recommendations
        </>
      )}
    </Button>
  );
}

export function StyleAdvisorClient({
  getRecommendations,
}: {
  getRecommendations: (
    prevState: StyleAdvisorState,
    formData: FormData
  ) => Promise<StyleAdvisorState>;
}) {
  const [state, formAction] = useFormState(getRecommendations, initialState);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="overflow-hidden shadow-xl">
        <CardHeader className="bg-muted/30 text-center">
            <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Wand2 className="h-8 w-8 text-primary" />
            </div>
          <CardTitle className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">AI Style Advisor</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Let our AI help you discover the perfect look.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <form action={formAction} className="space-y-6">
            <div>
              <label htmlFor="preferences" className="block text-sm font-medium text-foreground mb-2">
                Describe your style
              </label>
              <Textarea
                id="preferences"
                name="preferences"
                rows={5}
                placeholder="e.g., 'I love vibrant colors and comfortable fabrics. I prefer modern, minimalist styles but I'm open to trying traditional wear. I usually wear dresses and skirts.'"
                className="min-h-[120px]"
                required
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us about your favorite colors, fabrics, and the types of clothes you enjoy wearing.
              </p>
            </div>
            <SubmitButton />
          </form>

          {state.error && (
            <div className="mt-6 flex items-center gap-x-2 rounded-md border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                <AlertCircle className="h-4 w-4" />
                <p>{state.error}</p>
            </div>
          )}

          {state.styleRecommendations && (
            <div className="mt-8">
              <h3 className="text-2xl font-semibold tracking-tight font-headline">Your Personalized Recommendations</h3>
              <div className="mt-4 prose prose-stone dark:prose-invert max-w-none text-foreground">
                {state.styleRecommendations.split('\n').map((line, index) => {
                    if (line.trim().startsWith('*') || line.trim().startsWith('-')) {
                        return <p key={index} className="ml-4 my-1">{line}</p>;
                    }
                    return <p key={index}>{line}</p>;
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
