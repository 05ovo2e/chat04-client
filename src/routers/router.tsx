import { Route, Routes } from 'react-router-dom';
import { ChatRoomJoin } from '@/pages/ChatRoomJoin';
import { ChatRoomCreate } from '@/pages/ChatRoomCreate';
import { WaitRoomJoin } from '@/pages/WaitRoomJoin';

export const Router = () => {
  return (
    <Routes>
      <Route path="/ChatRoomCreate" element={<ChatRoomCreate />} />
      <Route path="/ChatRoomJoin" element={<ChatRoomJoin />} />
      <Route path="/WaitRoomJoin" element={<WaitRoomJoin />} />
    </Routes>
  );
};
