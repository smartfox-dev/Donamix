import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';

interface ITabsProps extends TabsProps {
  defaultValue?: string;
  children: React.ReactNode;
}

export const CustomTabs: React.FC<ITabsProps> = ({
  defaultValue,
  children,
  ...props
}) => {
  return (
    <Tabs defaultValue={defaultValue} {...props}>
      {children}
    </Tabs>
  );
};

interface ITabListProps extends TabsListProps {
  children: React.ReactNode;
}

export const CustomTabList: React.FC<ITabListProps> = ({
  children,
  ...props
}) => {
  return (
    <TabsList
      className="flex w-full h-[42px] p-0 rounded-lg bg-secondary"
      {...props}
    >
      {children}
    </TabsList>
  );
};

interface ITabProps extends TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

export const CustomTab: React.FC<ITabProps> = ({
  value,
  children,
  ...props
}) => {
  return (
    <TabsTrigger
      {...props}
      className={cn(
        'flex-1 h-full rounded-lg text-black data-[state=active]:bg-primary data-[state=active]:text-white',
        props.className
      )}
      value={value}
    >
      {children}
    </TabsTrigger>
  );
};

interface ITabContentProps extends TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const CustomTabContent: React.FC<ITabContentProps> = ({
  value,
  children,
  ...props
}) => {
  return (
    <TabsContent value={value} {...props}>
      {children}
    </TabsContent>
  );
};
