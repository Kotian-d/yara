import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardCard = ({
  className,
  title,
  children,
  description,
  icon,
  ...props
}) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader
        className={"text-muted-foreground flex items-center justify-between lg:flex-nowrap flex-wrap-reverse"}
      >
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {icon}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <span className="text-2xl">{children}</span>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        {description}
      </CardFooter>
    </Card>
  );
};

export const ChartCard = ({
  className,
  title,
  children,
  description,
  icon,
  ...props
}) => {
  return (
    <Card className="w-full">
      <CardHeader
        className={"text-muted-foreground flex items-center justify-between"}
      >
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {icon}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <span className="text-2xl">{children}</span>
      </CardContent>
      <CardFooter className="text-muted-foreground text-sm">
        {description}
      </CardFooter>
    </Card>
  );
};

export default DashboardCard;
