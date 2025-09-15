export interface AdminDashboardCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ElementType;
  socialMediaIcon?: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}
