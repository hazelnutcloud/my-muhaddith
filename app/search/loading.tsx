import Hero from "@/components/Hero";
import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const loading = (props: Props) => {
  return (
    <div>
      <Hero />
      <div className="flex justify-center py-16 bg-primary-blue text-primary-white h-[600px]">
        <div className="flex flex-col gap-10 w-[900px] px-4">
          {Array(3)?.map((_, i: number) => (
            <div
              key={i}
              className="flex flex-col p-6 space-y-8 border border-gray-700 rounded-lg"
            >
              {/* Header */}
              <div className="flex flex-col justify-between py-4 border-b border-gray-400 lg:flex-row">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                <Skeleton className="w-[100px] h-[20px] rounded-full" />

                <p>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" /> |{" "}
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </p>
              </div>

              {/* Hadith */}
              <div className="space-y-6 text-sm font-thin tracking-wide">
                <p className="flex flex-col gap-2">
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </p>
                <p className="leading-loose text-right text-primary-white/60">
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </p>
              </div>

              {/* Scholar */}
              <div className="flex justify-between">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                <p>
                  <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
