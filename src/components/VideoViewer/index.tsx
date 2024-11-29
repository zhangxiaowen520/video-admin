import { CloseOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { useRef, useState } from 'react';
import './VideoViewer.css';

interface VideoViewerProps {
  videoSrc: string; // 视频地址
  width?: number | string; // 缩略图宽度
  height?: number | string; // 缩略图高度
}

const VideoViewer: React.FC<VideoViewerProps> = ({ videoSrc, width = 300, height = 200 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null); // 引用视频

  const handleMouseEnter = () => setIsPlaying(true);
  const handleMouseLeave = () => setIsPlaying(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
    // 显式调用 play 方法确保自动播放
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.warn('视频播放失败:', err);
        });
      }
    }, 0);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // 重置播放位置
    }
  };

  return (
    <>
      <div
        className="video-thumbnail"
        style={{ width, height, position: 'relative', cursor: 'pointer' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleOpenModal}
      >
        {isPlaying ? (
          <video
            src={videoSrc}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            autoPlay
            muted
            loop
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PlayCircleOutlined style={{ fontSize: 24, color: 'white' }} />
          </div>
        )}
      </div>

      <Modal
        open={isModalVisible}
        footer={null}
        onCancel={handleCloseModal}
        centered
        closeIcon={null} // 移除默认关闭按钮
        width="80%"
      >
        <div style={{ position: 'relative' }}>
          {/* 自定义关闭按钮 */}
          <CloseOutlined
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontSize: 24,
              color: 'white',
              zIndex: 1000,
              cursor: 'pointer',
            }}
            onClick={handleCloseModal}
          />
          <video
            ref={videoRef} // 绑定视频引用
            src={videoSrc}
            style={{ width: '100%', height: '100%' }}
            controls
          />
        </div>
      </Modal>
    </>
  );
};

export default VideoViewer;
