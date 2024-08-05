"use client";

import Tab from "@/lib/types/Tab";
import ScrollContainer from "react-indiana-drag-scroll";

type TabsProps = {
  tabs: Tab[];
  activeTab: number;
  toggleTab: (index: number) => void;
};

const activeTabStyle =
  "inline-block p-4 text-rose-600 rounded-t-lg bg-gray-800 min-w-20 flex-shrink-0";

const inactiveTabStyle =
  "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300 min-w-20 flex-shrink-0";

const Tabs = ({ tabs, activeTab, toggleTab }: TabsProps) => {
  return (
    <ScrollContainer>
      <ul className="flex  text-sm font-medium text-center border-gray-700 text-gray-400">
        {tabs.map((tab: Tab) => (
          <li key={tab.index} className="me-2 cursor-pointer">
            <span
              aria-current={activeTab === tab.index ? "page" : undefined}
              className={
                activeTab === tab.index ? activeTabStyle : inactiveTabStyle
              }
              onClick={() => toggleTab(tab.index)}>
              {tab.name}
            </span>
          </li>
        ))}
      </ul>
    </ScrollContainer>
  );
};

export default Tabs;
