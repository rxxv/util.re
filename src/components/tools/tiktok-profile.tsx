"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const normalizeHandle = (value: string) =>
  value.trim().replace(/^@/, "").replace(/\s+/g, "");

type Profile = {
  username: string;
  displayName: string;
  avatar: string;
  signature: string;
  verified: boolean;
  region: string;
  userId: string;
  createdAt: string;
  stats: {
    followers: string;
    following: string;
    likes: string;
    videos: string;
  } | null;
};

const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

export default function TikTokProfileTool() {
  const [handle, setHandle] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [error, setError] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);

  const profileUrl = useMemo(() => {
    const cleaned = normalizeHandle(handle);
    if (!cleaned) return "";
    return `https://www.tiktok.com/@${cleaned}`;
  }, [handle]);

  const handleLookup = async () => {
    const cleaned = normalizeHandle(handle);
    if (!cleaned) {
      setError("Enter a username.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setError("");
    setProfile(null);
    try {
      const response = await fetch(`/api/tiktok?username=${encodeURIComponent(cleaned)}`);
      const data = await response.json();
      if (!response.ok) {
        setStatus("error");
        setError(data.error || "Lookup failed.");
        return;
      }
      setProfile(data as Profile);
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Lookup failed.");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 space-y-2">
        <label htmlFor="tiktok-handle" className="text-sm font-medium text-[var(--ink)]">
          TikTok username
        </label>
        <Input
          id="tiktok-handle"
          type="text"
          value={handle}
          onChange={(event) => setHandle(event.target.value)}
          placeholder="@username"
        />
        <div className="flex flex-wrap gap-3">
          <Button type="button" onClick={handleLookup} disabled={status === "loading"}>
            {status === "loading" ? "Looking up..." : "Lookup"}
          </Button>
          {profileUrl ? (
            <a
              href={profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--paper-surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition hover:bg-[var(--paper-bg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper-bg)]"
            >
              Open profile
            </a>
          ) : null}
        </div>
      </Card>

      {status === "error" ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      <Card className="p-4 space-y-3">
        <p className="text-sm font-medium text-[var(--ink)]">Profile</p>
        {!profile ? (
          <p className="text-sm text-[var(--muted)]">
            {status === "loading" ? "Fetching profile..." : "No profile loaded."}
          </p>
        ) : (
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={`${profile.username} avatar`}
                className="h-16 w-16 rounded-full border border-[var(--border)] object-cover"
              />
            ) : null}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-base font-semibold text-[var(--ink)]">
                  {profile.displayName || profile.username}
                </p>
                {profile.verified ? (
                  <span className="rounded-full border border-[var(--border)] bg-[#e3ebdf] px-2 py-0.5 text-xs text-[var(--accent-green)]">
                    Verified
                  </span>
                ) : null}
              </div>
              <p className="text-xs text-[var(--muted)]">@{profile.username}</p>
              {profile.signature ? (
                <p className="text-sm text-[var(--muted)]">{profile.signature}</p>
              ) : null}
              <div className="flex flex-wrap gap-3 text-xs text-[var(--muted)]">
                {profile.region ? <span>Region: {profile.region}</span> : null}
                {profile.userId ? <span>ID: {profile.userId}</span> : null}
                {profile.createdAt ? (
                  <span>Created: {formatDate(profile.createdAt)}</span>
                ) : null}
              </div>
              {profile.stats ? (
                <div className="flex flex-wrap gap-3 text-xs text-[var(--muted)]">
                  <span>{profile.stats.followers} followers</span>
                  <span>{profile.stats.following} following</span>
                  <span>{profile.stats.likes} likes</span>
                  <span>{profile.stats.videos} videos</span>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
