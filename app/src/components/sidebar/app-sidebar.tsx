'use client';

import * as React from 'react';
import {
    AudioWaveform,
    BookOpen,
    Bot,
    Frame,
    GalleryVerticalEnd,
    Map,
    PieChart,
    Settings2,
    SquareTerminal
} from 'lucide-react';

import { NavMain } from './nav-main';
import { NavProjects } from './nav-projects';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';

const data = {
    user: {
        name: 'boilerplate',
        email: 'b@example.com',
        avatar: '/avatars/avatar.jpg'
    },
    teams: [
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise'
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup'
        }
    ],
    navMain: [
        {
            title: 'Menu Item 1',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: 'Sub-item 1.1',
                    url: '#'
                },
                {
                    title: 'Sub-item 1.2',
                    url: '#'
                },
                {
                    title: 'Sub-item 1.3',
                    url: '#'
                }
            ]
        },
        {
            title: 'Menu Item 2',
            url: '#',
            icon: Bot,
            items: [
                {
                    title: 'Sub-item 2.1',
                    url: '#'
                },
                {
                    title: 'Sub-item 2.2',
                    url: '#'
                }
            ]
        },
        {
            title: 'Menu Item 3',
            url: '#',
            icon: BookOpen,
            items: [
                {
                    title: 'Sub-item 3.1',
                    url: '#'
                },
                {
                    title: 'Sub-item 3.2',
                    url: '#'
                }
            ]
        },
        {
            title: 'Menu Item 4',
            url: '#',
            icon: Settings2,
            items: [
                {
                    title: 'Sub-item 4.1',
                    url: '#'
                },
                {
                    title: 'Sub-item 4.2',
                    url: '#'
                }
            ]
        }
    ],
    projects: [
        {
            name: 'Project A',
            url: '#',
            icon: Frame
        },
        {
            name: 'Project B',
            url: '#',
            icon: PieChart
        },
        {
            name: 'Project C',
            url: '#',
            icon: Map
        }
    ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
