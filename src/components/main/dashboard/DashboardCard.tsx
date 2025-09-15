import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardCardProps } from "@/app/main/dashboard/types";
import { cn } from "@/lib/utils";

const DashboardCard = ({
  title,
  value,
  description,
  icon: Icon,
  socialMediaIcon: SocialMediaIcon,
  className,
}: DashboardCardProps) => {
  return (
    <Card className={cn("", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex gap-2">
          {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
          {SocialMediaIcon && (
            <SocialMediaIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {/* <p className="text-xs text-muted-foreground">
          <span className="text-green-600">+0%</span> desde ayer
        </p> */}
      </CardContent>
      {description && (
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">{description}</div>
        </CardFooter>
      )}
    </Card>
  );
};

export default DashboardCard;
