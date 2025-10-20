import { personalizedStyleRecommendations } from "@/ai/flows/personalized-style-recommendations";
import { StyleAdvisorClient } from "@/components/style-advisor-client";

type StyleAdvisorState = {
  styleRecommendations: string;
  error?: string;
};

export default async function StyleAdvisorPage() {
  async function getRecommendations(
    prevState: StyleAdvisorState,
    formData: FormData
  ): Promise<StyleAdvisorState> {
    "use server";
    const userPreferences = formData.get("preferences") as string;
    
    // In a real app, this would be dynamically fetched or updated.
    const trendingFashion = "Currently trending in Nigeria are bold Ankara prints in modern silhouettes, minimalist Agbada for men, and two-piece sets with intricate beading. Earthy tones and vibrant greens are popular colors.";

    if (!userPreferences) {
      return {
        ...prevState,
        error: "Please describe your style preferences.",
      };
    }

    try {
      const result = await personalizedStyleRecommendations({
        userPreferences,
        trendingFashion,
      });

      return {
        styleRecommendations: result.styleRecommendations,
      };
    } catch (e) {
      console.error(e);
      return {
        ...prevState,
        error: "We couldn't generate recommendations at this time. Please try again later.",
      };
    }
  }

  return <StyleAdvisorClient getRecommendations={getRecommendations} />;
}
