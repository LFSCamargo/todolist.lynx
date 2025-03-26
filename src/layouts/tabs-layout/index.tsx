import {
  useNavigate,
  useParams,
  useResolvedPath,
  useInRouterContext,
  useLocation,
} from 'react-router';
import { assets } from '../../assets/index.js';
import './styles.css';

type Props = {
  children: React.ReactNode;
};

export function TabsLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname } = useResolvedPath({
    pathname: '/',
  });

  return (
    <view class="app-wrapper safe-area-view">
      <view class="router-wrapper">{children}</view>
      <view className="tabs-wrapper">
        {tabs.map((tab) => (
          <view
            key={tab.path}
            className={`center ${tab.path === location.pathname ? 'active-tab' : 'inactive-tab'}`}
            bindtap={() => navigate(tab.path)}
          >
            <image src={tab.icon} className="tab-icon" />
            <text>{tab.label}</text>
          </view>
        ))}
      </view>
    </view>
  );
}

const tabs = [
  {
    label: 'Todos',
    path: '/',
    icon: assets.todosIcon
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: assets.cogIcon
  },
];
