import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages/pages.component';
import { BlankComponent } from './pages/blank/blank.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/errors/error/error.component';

export const routes: Routes = [
    { 
        path: 'loggedin', 
        component: PagesComponent, children: [
            { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: 'Dashboard' } },

            { path:'paypal',loadChildren:()=>import('./pages/paypal-amount/paypal-amount.module').then(m=>m.PaypalAmountModule),data: { breadcrumb: 'PayPal' } },
            
            { path: 'explore', loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExploreModule), data: { breadcrumb: 'Explore' } },

            { path: 'arbitrage', loadChildren: () => import('./pages/arbitrage/arbitrage.module').then(m => m.ArbitrageModule), data: { breadcrumb: 'Arbitrage' } },
            
            { path: 'arbitrage-form', loadChildren: () => import('./pages/arbitrage-form/arbitrage-form.module').then(m => m.ArbitrageFormModule), data: { breadcrumb: 'ArbitrageForm' } },

            { path: 'arbitrage-form-two', loadChildren: () => import('./pages/arbitrage-form-two/arbitrage-form-two.module').then(m => m.ArbitrageFormTwoModule), data: { breadcrumb: 'ArbitrageFormTwoModule' } },

            { path: 'charts', loadChildren: () => import('./pages/charts2/charts2.module').then(m => m.Charts2Module), data: { breadcrumb: 'Charts2' } },

            { path: 'trading-room', loadChildren: () => import('./pages/trading-room/trading-room.module').then(m => m.TradingRoomModule), data: { breadcrumb: 'Users' } },

            { path: 'create-room', loadChildren: () => import('./pages/create-room/create-room.module').then(m => m.CreateRoomModule), data: { breadcrumb: 'Users' } },

            { path: 'add-members', loadChildren: () => import('./pages/add-members/add-members.module').then(m => m.AddMembersModule), data: { breadcrumb: 'Users' } },

            { path: 'join-room', loadChildren: () => import('./pages/join-room/join-room.module').then(m => m.JoinRoomModule), data: { breadcrumb: 'Users' } },

            { path: 'my-rooms', loadChildren: () => import('./pages/my-rooms/my-rooms.module').then(m => m.MyRoomsModule), data: { breadcrumb: 'Users' } },

            { path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
            { path: 'dynamic-menu', loadChildren: () => import('./pages/dynamic-menu/dynamic-menu.module').then(m => m.DynamicMenuModule), data: { breadcrumb: 'Dynamic Menu' }  },          
            { path: 'ui', loadChildren: () => import('./pages/ui/ui.module').then(m => m.UiModule), data: { breadcrumb: 'UI' } },
            { path: 'mailbox', loadChildren: () => import('./pages/mailbox/mailbox.module').then(m => m.MailboxModule), data: { breadcrumb: 'Mailbox' } },
            { path: 'chat', loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatModule), data: { breadcrumb: 'Chat' } },
            { path: 'form-controls', loadChildren: () => import('./pages/form-controls/form-controls.module').then(m => m.FormControlsModule), data: { breadcrumb: 'Form Controls' } },
            { path: 'tables', loadChildren: () => import('./pages/tables/tables.module').then(m => m.TablesModule), data: { breadcrumb: 'Tables' } },
            { path: 'schedule', loadChildren: () => import('./pages/schedule/schedule.module').then(m => m.ScheduleModule), data: { breadcrumb: 'Schedule' } },
            { path: 'maps', loadChildren: () => import('./pages/maps/maps.module').then(m => m.MapsModule), data: { breadcrumb: 'Maps' } },
            { path: 'charts', loadChildren: () => import('./pages/charts/charts.module').then(m => m.ChartsModule), data: { breadcrumb: 'Charts' } },
            { path: 'drag-drop', loadChildren: () => import('./pages/drag-drop/drag-drop.module').then(m => m.DragDropModule), data: { breadcrumb: 'Drag & Drop' } },
            { path: 'icons', loadChildren: () => import('./pages/icons/icons.module').then(m => m.IconsModule), data: { breadcrumb: 'Material Icons' } },
            { path: 'profile', loadChildren: () => import ('./pages/profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: 'Profile' } }, 
            { path: 'share-screen', loadChildren: () => import ('./pages/share-screen/share-screen.module').then(m => m.ShareScreenModule), data: { breadcrumb: 'Share Screen' } }, 
            { path: 'blank', component: BlankComponent, data: { breadcrumb: 'Blank page' } },
            { path: 'search', component: SearchComponent, data: { breadcrumb: 'Search' } },
            { path: 'search/:name', component: SearchComponent, data: { breadcrumb: 'Search' } },

            { path: 'logout', loadChildren: () => import('./pages/logout/logout.module').then(m => m.LogoutModule), data: { breadcrumb: 'Logout' } },
           
        ]
    },
    { path: 'admin',
        component: PagesComponent, children: [
            { path: 'arb-users', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule), data: { breadcrumb: 'Arbitrage Users' } },
            { path: 'arb-user', loadChildren: () => import('./pages/arbitrage-users/arbitrage-users.module').then(m => m.ArbitrageUsersModule), data: { breadcrumb: 'Arbitrage Users' } },
        ]
    },
    // {path: 'mydashboard', loadChildren:()=> import('./pages/my-dashboard/my-dashboard.module').then(m=>m.MyDashboardModule) },
    { path: '', loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule) },
    { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
    { path: 'register', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) },
    // {path:'fx-blue',loadChildren:() =>  import('./pages/fx-blue-details/fx-blue-details.module').then(m => m.FxBlueDetailsModule) },
    { path: 'error', component: ErrorComponent, data: { breadcrumb: 'Error' } },
    { path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    // preloadingStrategy: PreloadAllModules,  // <- uncomment this line for disable lazy load
    // useHash: true
});