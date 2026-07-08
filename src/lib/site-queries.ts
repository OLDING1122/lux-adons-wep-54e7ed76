import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteStats = {
  total_addons: number;
  active_addons: number;
  inactive_addons: number;
  community_members: number;
  updated_at: string;
};

export type Announcement = {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string | null;
  excerpt_ar: string;
  body_ar: string;
  tag: "update" | "release" | "event" | "news";
  image_url: string | null;
  pinned: boolean;
  published_at: string;
};

export const siteStatsQuery = () =>
  queryOptions({
    queryKey: ["site-stats"],
    staleTime: 60_000,
    queryFn: async (): Promise<SiteStats> => {
      const { data, error } = await supabase
        .from("site_stats")
        .select("total_addons, active_addons, inactive_addons, community_members, updated_at")
        .eq("id", true)
        .maybeSingle();
      if (error) throw error;
      return (
        data ?? {
          total_addons: 0,
          active_addons: 0,
          inactive_addons: 0,
          community_members: 0,
          updated_at: new Date().toISOString(),
        }
      );
    },
  });

export const announcementsQuery = (limit?: number) =>
  queryOptions({
    queryKey: ["announcements", { limit: limit ?? "all" }],
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<Announcement[]> => {
      let query = supabase
        .from("announcements")
        .select("id, slug, title_ar, title_en, excerpt_ar, body_ar, tag, image_url, pinned, published_at")
        .lte("published_at", new Date().toISOString())
        .order("pinned", { ascending: false })
        .order("published_at", { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Announcement[];
    },
  });

export const announcementBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["announcement", slug],
    staleTime: 5 * 60_000,
    queryFn: async (): Promise<Announcement | null> => {
      const { data, error } = await supabase
        .from("announcements")
        .select("id, slug, title_ar, title_en, excerpt_ar, body_ar, tag, image_url, pinned, published_at")
        .eq("slug", slug)
        .lte("published_at", new Date().toISOString())
        .maybeSingle();
      if (error) throw error;
      return (data as Announcement | null) ?? null;
    },
  });
