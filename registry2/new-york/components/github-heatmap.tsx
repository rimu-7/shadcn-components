"use client";

import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { format } from "date-fns";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GithubHeatMapProps {
  username: string;
}

export function GithubHeatMap({ username }: GithubHeatMapProps) {
  const { theme, systemTheme } = useTheme();
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchData = useCallback(async () => {
    if (!username) return;

    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(
        `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
      );

      if (!res.ok) throw new Error("Failed to fetch GitHub data");

      const json = await res.json();
      const contributions = json?.contributions ?? [];

      setData(contributions);
      setTotal(contributions.reduce((sum: number, d: any) => sum + d.count, 0));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const colorTheme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  const renderBlock = (block: React.ReactElement, activity: any) => {
    const trigger = React.cloneElement(block, {
      className: "cursor-pointer hover:opacity-80 transition-opacity",
    });

    return (
      <Tooltip key={activity.date}>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent>
          <div className="text-xs text-center">
            <div className="font-medium">
              {activity.count || "No"} contributions
            </div>
            <div className="text-muted-foreground">
              {format(new Date(activity.date), "MMM d, yyyy")}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load GitHub data.</AlertDescription>
      </Alert>
    );
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>GitHub Contributions</CardTitle>
              {!isLoading && (
                <CardDescription>
                  <span className="font-medium">{total}</span> contributions last
                  year
                </CardDescription>
              )}
            </div>

            <Button size="icon" variant="ghost" asChild>
              <Link
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <Skeleton className="h-36 w-full" />
          ) : (
            <div className="overflow-x-auto">
              <div className="min-w-[700px]">
                <ActivityCalendar
                  data={data}
                  theme={colorTheme}
                  colorScheme={currentTheme === "dark" ? "dark" : "light"}
                  blockSize={12}
                  blockMargin={4}
                  blockRadius={3}
                  hideTotalCount
                  renderBlock={renderBlock}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
