import { MenuItem } from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Personal',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/chart-pie.svg',
          label: 'Dashboard',
          route: '/dashboard',
          // children: [
          //   { label: 'Nfts', route: '/dashboard/nfts' },
          //   // { label: 'Podcast', route: '/dashboard/podcast' },
          // ],
        },
        {
          icon: 'assets/icons/heroicons/outline/lock-closed.svg',
          label: 'Users',
          route: '/sci/users',
          // children: [
          //   // { label: 'Sign up', route: '/auth/sign-up' },
          //   // { label: 'Sign in', route: '/auth/sign-in' },
          //   // { label: 'Forgot Password', route: '/auth/forgot-password' },
          //   // { label: 'New Password', route: '/auth/new-password' },
          //   // { label: 'Two Steps', route: '/auth/two-steps' },
          //   { label: 'Users', route: '/user' },            
          // ],
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/shield-exclamation.svg',
        //   label: 'Erros',
        //   route: '/errors',
        //   children: [
        //     { label: '404', route: '/errors/404' },
        //     { label: '500', route: '/errors/500' },
        //   ],
        // },
      ],
    },
    {
      group: 'Emergencies',
      separator: true,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/download.svg',
          label: 'Information',
          route: '/sci/emergencies',
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/folder.svg',
        //   label: 'Forms',
        //   route: '/forms',
        //   children: [
        //     { label: 'Form 201', route: '/forms/201' },
        //     { label: 'Form 207', route: '/forms/207' },
        //     { label: 'Form 211', route: '/forms/211' },
        //   ],
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/gift.svg',
        //   label: 'Forms',
        //   route: '/gift',
        // },
        // {
        //   icon: 'assets/icons/heroicons/outline/users.svg',
        //   label: 'Users',
        //   route: '/users',
        // },
      ],
    },
    {
      group: 'Config',
      separator: false,
      items: [
        {
          icon: 'assets/icons/heroicons/outline/cog.svg',
          label: 'Settings',
          route: '/settings',
        },
        {
          icon: 'assets/icons/heroicons/outline/bell.svg',
          label: 'Notifications',
          route: '/gift',
        },
        // {
        //   icon: 'assets/icons/heroicons/outline/folder.svg',
        //   label: 'Folders',
        //   route: '/folders',
        //   children: [
        //     { label: 'Current Files', route: '/folders/current-files' },
        //     { label: 'Downloads', route: '/folders/download' },
        //     { label: 'Trash', route: '/folders/trash' },
        //   ],
        // },
      ],
    },
  ];
}
