import { useState, ChangeEvent, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'; // 텍스트 필드들 세로 정렬
import axiosInstance from '@/api/axiosInstance'; // 설정한 axios 인스턴스
import { useNavigate } from 'react-router-dom'; // React Router v6

const ChatRoomCreateForm = () => {
  const [roomName, setRoomName] = useState<string>('');
  const [nickName, setNickName] = useState<string>('');
  const [maxUserCnt, setMaxUserCnt] = useState<number>(2); // 최소 인원 2명

  const navigate = useNavigate();

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleRoomNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleMaxUserCntChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);

    if (value >= 2 && value <= 6) {
      setMaxUserCnt(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = `/chatrooms/create?roomName=${encodeURIComponent(roomName)}&nickname=${encodeURIComponent(nickName)}&maxUserCnt=${maxUserCnt}`;

      const response = await axiosInstance.post(url, {
        roomName,
        nickname: nickName,
        maxUserCnt,
      });
      // 성공 시
      console.log('응답:', response.data);

      // 채팅방 아이디...?
      const hostId = response.data.id;

      // 폼 제출 후 다음 페이지로 이동
      navigate('/WaitRoomJoin', { state: { roomName, nickName, maxUserCnt, hostId } });

      // 폼 필드 초기화
      setNickName('');
      setRoomName('');
      setMaxUserCnt(3);
    } catch (error) {}
  };

  return (
    <div>
      <h4>방장이 주제와 인원을 설정하세요</h4>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column">
          <TextField
            required
            id="nickName"
            label="사용할 별명을 입력해주세요"
            variant="standard"
            value={nickName}
            onChange={handleNicknameChange}
          />

          <TextField
            required
            id="roomName"
            label="방 이름을 입력해주세요"
            variant="standard"
            value={roomName}
            onChange={handleRoomNameChange}
          />

          <TextField
            required
            id="maxUserCnt"
            type="number"
            label="몇 명이 참여하나요?"
            variant="standard"
            value={maxUserCnt}
            onChange={handleMaxUserCntChange}
            inputProps={{ min: 2, max: 6 }} // 최소 및 최대값 설정
          />

          <button type="submit">확인</button>
          <h4>생성 후에는 수정이 불가능해요</h4>
        </Stack>
      </form>
    </div>
  );
};

export default ChatRoomCreateForm;
