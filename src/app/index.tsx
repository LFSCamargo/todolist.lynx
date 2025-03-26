import { MemoryRouter, Route, Routes } from 'react-router';
import { TodosScreen } from './todos/index.jsx';
import { TabsLayout } from '../layouts/index.js';
import { SettingsScreen } from './settings/index.jsx';

export function AppRouter() {
  return (
    <MemoryRouter>
      <TabsLayout>
        <Routes>
          <Route path="/" element={<TodosScreen />} />
          <Route path="/todos" element={<TodosScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
        </Routes>
      </TabsLayout>
    </MemoryRouter>
  );
}
