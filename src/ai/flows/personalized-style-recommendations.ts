'use server';
/**
 * @fileOverview Personalized style recommendations flow.
 *
 * This flow generates personalized style recommendations based on user preferences and trending Nigerian fashion.
 * - personalizedStyleRecommendations - A function that generates personalized style recommendations.
 * - PersonalizedStyleRecommendationsInput - The input type for the personalizedStyleRecommendations function.
 * - PersonalizedStyleRecommendationsOutput - The return type for the personalizedStyleRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedStyleRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe(
      'A description of the user’s style preferences, including preferred colors, fabrics, and styles.'
    ),
  trendingFashion: z
    .string()
    .describe('A description of current trending fashion in Nigeria.'),
});
export type PersonalizedStyleRecommendationsInput = z.infer<
  typeof PersonalizedStyleRecommendationsInputSchema
>;

const PersonalizedStyleRecommendationsOutputSchema = z.object({
  styleRecommendations: z
    .string()
    .describe('A list of personalized style recommendations for the user.'),
});
export type PersonalizedStyleRecommendationsOutput = z.infer<
  typeof PersonalizedStyleRecommendationsOutputSchema
>;

export async function personalizedStyleRecommendations(
  input: PersonalizedStyleRecommendationsInput
): Promise<PersonalizedStyleRecommendationsOutput> {
  return personalizedStyleRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedStyleRecommendationsPrompt',
  input: {schema: PersonalizedStyleRecommendationsInputSchema},
  output: {schema: PersonalizedStyleRecommendationsOutputSchema},
  prompt: `You are a personal stylist specializing in Nigerian fashion.

  Based on the user's preferences and current trending fashion in Nigeria, provide personalized style recommendations.

  User Preferences: {{{userPreferences}}}
  Trending Fashion in Nigeria: {{{trendingFashion}}}

  Provide a detailed list of style recommendations that the user can follow to discover new looks and clothing items that match their taste.
  The style recommendations should include specific clothing items, colors, fabrics, and styles that are currently popular in Nigeria and match the user's preferences.
  Format the recommendations as a list.
  `,
});

const personalizedStyleRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedStyleRecommendationsFlow',
    inputSchema: PersonalizedStyleRecommendationsInputSchema,
    outputSchema: PersonalizedStyleRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
