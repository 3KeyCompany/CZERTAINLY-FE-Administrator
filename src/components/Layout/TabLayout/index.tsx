import { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

type Props = {
    tabs: {
        title: string | JSX.Element;
        hidden?: boolean;
        content: JSX.Element;
        disabled?: boolean;
        onClick?: () => void;
    }[];
    onlyActiveTabContent?: boolean;
    selectedTab?: number;
};

export default function TabLayout({ tabs, onlyActiveTabContent = false, selectedTab }: Props) {
    const [activeTab, setActiveTab] = useState(selectedTab || 0);

    useEffect(() => {
        if (selectedTab !== undefined && selectedTab !== activeTab) {
            setActiveTab(selectedTab);
        } else if (tabs.length <= activeTab) {
            setActiveTab(0);
        }
    }, [activeTab, tabs, selectedTab]);

    return (
        <>
            <Nav tabs>
                {tabs
                    .filter((e) => !e.hidden)
                    .map((t, i) => (
                        <NavItem key={`nav-${i}`}>
                            <NavLink
                                className={activeTab === i ? "active" : ""}
                                onClick={() => {
                                    if (t.disabled) {
                                        return;
                                    }
                                    setActiveTab(i);
                                    if (t.onClick) {
                                        t.onClick();
                                    }
                                }}
                            >
                                {t.title}
                            </NavLink>
                        </NavItem>
                    ))}
            </Nav>
            <TabContent activeTab={activeTab}>
                {tabs
                    .filter((e) => !e.hidden)
                    .map((t, i) =>
                        onlyActiveTabContent === false || activeTab === i ? (
                            <TabPane key={`pane-${i}`} tabId={i}>
                                {t.content}
                            </TabPane>
                        ) : null,
                    )}
            </TabContent>
        </>
    );
}
