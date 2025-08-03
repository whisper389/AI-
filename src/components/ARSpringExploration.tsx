import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, MapPin, Info, Volume2, VolumeX, RotateCcw, Maximize, Eye, Compass, Star } from 'lucide-react';

interface ARSpringExplorationProps {
  onBack: () => void;
}

interface SpringData {
  id: string;
  name: string;
  location: string;
  description: string;
  history: string;
  features: string[];
  temperature: string;
  depth: string;
  flow: string;
  legend: string;
  image: string;
  arModel: string;
  audioGuide: string;
  coordinates: { x: number; y: number };
  hotspots: Array<{
    id: string;
    name: string;
    position: { x: number; y: number };
    info: string;
  }>;
}

const ARSpringExploration: React.FC<ARSpringExplorationProps> = ({ onBack }) => {
  const [selectedSpring, setSelectedSpring] = useState<SpringData | null>(null);
  const [isARMode, setIsARMode] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const springs: SpringData[] = [
    {
      id: 'baotu',
      name: '趵突泉',
      location: '济南市历下区趵突泉南路1号',
      description: '济南三大名胜之一，被誉为"天下第一泉"，泉水一年四季恒定在18℃左右',
      history: '趵突泉有着悠久的历史，早在《春秋》时代就有记载。北魏郦道元《水经注》称其为"泺水"，宋代文学家曾巩始称"趵突泉"。',
      features: ['三股并发', '声如隐雷', '势如鼎沸', '冬暖夏凉'],
      temperature: '18°C',
      depth: '4.5米',
      flow: '240立方米/小时',
      legend: '相传很久以前，济南大旱三年，民不聊生。东海龙王派遣三个儿子前来济南救民于水火，化身为三股清泉，日夜不停地向上喷涌。',
      image: 'https://static.yueya.net/shuomingshu.cn//wp-content/uploads/images/2022/11/25/daeace802891460c8c08c5f74570d727_mugypk0a1st.jpg',
      arModel: '/models/baotu-spring.glb',
      audioGuide: '/audio/baotu-guide.mp3',
      coordinates: { x: 50, y: 60 },
      hotspots: [
        {
          id: 'main-spring',
          name: '主泉眼',
          position: { x: 45, y: 55 },
          info: '三股泉水并发，声如隐雷，势如鼎沸，是趵突泉的核心景观'
        },
        {
          id: 'pavilion',
          name: '观澜亭',
          position: { x: 60, y: 40 },
          info: '明代建筑，是观赏趵突泉的最佳位置，亭内有历代文人墨客的题词'
        },
        {
          id: 'stone-tablet',
          name: '趵突泉石碑',
          position: { x: 35, y: 70 },
          info: '清代康熙皇帝御笔亲题"激湍"二字，彰显了趵突泉的皇家地位'
        }
      ]
    },
    {
      id: 'heihu',
      name: '黑虎泉',
      location: '济南市历下区黑虎泉西路',
      description: '济南四大泉群之一，因泉水从虎头石雕中喷出而得名，水声如虎啸',
      history: '黑虎泉的历史可追溯到金代，明代晏璧《七十二泉诗》和清代郝植恭《七十二泉记》都有详细记载。',
      features: ['虎头出水', '声如虎啸', '水质甘甜', '四季不竭'],
      temperature: '17°C',
      depth: '3.8米',
      flow: '180立方米/小时',
      legend: '传说古时有一只神虎守护着这眼泉水，每当有人想要污染泉水时，黑虎就会现身阻止，泉水从虎头中喷出，声如虎啸。',
      image: 'https://youimg1.c-ctrip.com/target/100o0z000000n5xzw010C.jpg',
      arModel: '/models/heihu-spring.glb',
      audioGuide: '/audio/heihu-guide.mp3',
      coordinates: { x: 30, y: 45 },
      hotspots: [
        {
          id: 'tiger-heads',
          name: '三个虎头',
          position: { x: 25, y: 40 },
          info: '三个石雕虎头并排而立，泉水从虎口中喷涌而出，造型威武雄壮'
        },
        {
          id: 'spring-pool',
          name: '泉池',
          position: { x: 35, y: 50 },
          info: '长约30米的天然石砌泉池，池水清澈见底，常年保持恒温'
        },
        {
          id: 'ancient-wall',
          name: '古城墙',
          position: { x: 20, y: 35 },
          info: '明代济南古城墙遗址，见证了黑虎泉的历史变迁'
        }
      ]
    },
    {
      id: 'wulongtan',
      name: '五龙潭',
      location: '济南市历下区趵突泉北路42号',
      description: '由五处泉水组成，相传为五龙所居，是济南市区最大的古典园林式公园',
      history: '五龙潭历史悠久，相传为隋唐英雄秦琼府邸，明清时期成为著名的游览胜地。',
      features: ['五泉相连', '古木参天', '亭台楼阁', '文化底蕴深厚'],
      temperature: '16°C',
      depth: '5.2米',
      flow: '150立方米/小时',
      legend: '相传古时济南水患频发，玉皇大帝派遣五条神龙前来治水，五龙合力制服水患，留下五个相连的泉池。',
      image: 'https://img1.qunarzz.com/travel/d5/1703/5b/4590a549977c07b5.jpg_r_640x426x70_16dec1a9.jpg',
      arModel: '/models/wulongtan-spring.glb',
      audioGuide: '/audio/wulongtan-guide.mp3',
      coordinates: { x: 70, y: 30 },
      hotspots: [
        {
          id: 'main-pool',
          name: '主池',
          position: { x: 65, y: 25 },
          info: '五龙潭的主要泉池，面积最大，水深超过5米，是五龙潭的核心'
        },
        {
          id: 'ancient-temple',
          name: '古温泉',
          position: { x: 75, y: 35 },
          info: '历史悠久的温泉遗址，相传为秦琼当年的沐浴之所'
        },
        {
          id: 'dragon-pavilion',
          name: '五龙亭',
          position: { x: 70, y: 20 },
          info: '纪念五龙治水的古亭，亭内有五龙雕像，工艺精美'
        }
      ]
    },
    {
      id: 'zhenzhu',
      name: '珍珠泉',
      location: '济南市历下区泉城路珍珠泉宾馆院内',
      description: '泉水从池底冒出，形如珍珠串串上升，晶莹剔透，故名珍珠泉',
      history: '珍珠泉在明清时期就已闻名，清代文人多有吟咏，是济南著名的观泉胜地。',
      features: ['珠泡串串', '晶莹剔透', '水质纯净', '四季如春'],
      temperature: '19°C',
      depth: '2.8米',
      flow: '120立方米/小时',
      legend: '传说古时有仙女思念人间恋人，每日以泪洗面，眼泪滴落人间化作清泉，泉中气泡就是仙女思念的眼泪化成的珍珠。',
      image: 'https://youimg1.c-ctrip.com/target/10061f000001gquixD810_D_10000_1200.jpg?proc=autoorient',
      arModel: '/models/zhenzhu-spring.glb',
      audioGuide: '/audio/zhenzhu-guide.mp3',
      coordinates: { x: 40, y: 80 },
      hotspots: [
        {
          id: 'pearl-bubbles',
          name: '珍珠气泡',
          position: { x: 35, y: 75 },
          info: '从池底不断冒出的气泡，如珍珠般晶莹剔透，是珍珠泉的独特景观'
        },
        {
          id: 'ancient-courtyard',
          name: '古院落',
          position: { x: 45, y: 85 },
          info: '明清时期的古建筑群，展现了济南传统建筑的精美工艺'
        },
        {
          id: 'wishing-well',
          name: '许愿池',
          position: { x: 40, y: 70 },
          info: '游客常在此许愿祈福，相传在珍珠泉许愿会带来好运'
        }
      ]
    }
  ];

  // 请求摄像头权限
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setCameraPermission('granted');
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      setCameraPermission('denied');
      console.error('Camera permission denied:', error);
    }
  };

  // 启动AR模式
  const startARMode = async () => {
    if (cameraPermission === 'prompt') {
      await requestCameraPermission();
    }
    if (cameraPermission === 'granted') {
      setIsARMode(true);
    }
  };

  // 停止AR模式
  const stopARMode = () => {
    setIsARMode(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  // 切换音频播放
  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
    // 这里可以添加实际的音频播放逻辑
  };

  // 重置AR视图
  const resetARView = () => {
    setSelectedHotspot(null);
    // 重置AR模型位置和角度
  };

  if (!selectedSpring) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-blue-100">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-blue-800 hover:text-blue-900 transition-colors duration-300"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">返回首页</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-800 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">AR泉水探索</h1>
                  <p className="text-sm text-slate-600">沉浸式泉水文化体验</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Camera className="w-4 h-4" />
                <span className="text-sm">增强现实技术</span>
              </div>
            </div>
          </div>
        </div>

        {/* 功能介绍 */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                科技与文化的完美融合
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                通过AR增强现实技术，让您身临其境地探索济南名泉，感受千年泉水文化的魅力
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">沉浸式体验</h3>
                <p className="text-slate-600">360度全景观看，仿佛置身泉水之中</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Info className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">互动解说</h3>
                <p className="text-slate-600">点击热点获取详细文化解读</p>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-red-50 rounded-xl">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Volume2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">语音导览</h3>
                <p className="text-slate-600">专业配音，生动讲述泉水故事</p>
              </div>
            </div>
          </div>

          {/* 泉水选择 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {springs.map((spring) => (
              <div
                key={spring.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer"
                onClick={() => setSelectedSpring(spring)}
              >
                <div className="relative h-48">
                  <img
                    src={spring.image}
                    alt={spring.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{spring.name}</h3>
                    <div className="flex items-center gap-1 text-sm opacity-90">
                      <MapPin className="w-3 h-3" />
                      <span>济南市历下区</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                      <Eye className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {spring.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>温度: {spring.temperature}</span>
                      <span>深度: {spring.depth}</span>
                    </div>
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2">
                      <Eye className="w-3 h-3" />
                      AR探索
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isARMode) {
    return (
      <div className="fixed inset-0 bg-black z-50">
        {/* AR视频背景 */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* AR覆盖层 */}
        <div className="absolute inset-0">
          {/* AR控制栏 */}
          <div className="absolute top-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between text-white">
              <button
                onClick={stopARMode}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                退出AR
              </button>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{selectedSpring.name}</span>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAudio}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  {isAudioPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <button
                  onClick={resetARView}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowInfo(!showInfo)}
                  className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* AR热点 */}
          {selectedSpring.hotspots.map((hotspot) => (
            <button
              key={hotspot.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                selectedHotspot === hotspot.id ? 'scale-125' : 'scale-100'
              } transition-all duration-300`}
              style={{
                left: `${hotspot.position.x}%`,
                top: `${hotspot.position.y}%`,
              }}
              onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedHotspot === hotspot.id 
                    ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' 
                    : 'bg-blue-500 shadow-lg shadow-blue-500/50'
                } animate-pulse`}>
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping"></div>
              </div>
            </button>
          ))}

          {/* 热点信息面板 */}
          {selectedHotspot && (
            <div className="absolute bottom-20 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-6 text-white">
              {(() => {
                const hotspot = selectedSpring.hotspots.find(h => h.id === selectedHotspot);
                return hotspot ? (
                  <div>
                    <h3 className="text-xl font-bold mb-2">{hotspot.name}</h3>
                    <p className="text-sm leading-relaxed opacity-90">{hotspot.info}</p>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* 信息面板 */}
          {showInfo && (
            <div className="absolute top-20 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-2xl p-6 text-white max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">{selectedSpring.name}</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold mb-2">基本信息</h3>
                  <div className="grid grid-cols-2 gap-2 opacity-90">
                    <div>温度: {selectedSpring.temperature}</div>
                    <div>深度: {selectedSpring.depth}</div>
                    <div>流量: {selectedSpring.flow}</div>
                    <div>位置: 济南市历下区</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">历史传说</h3>
                  <p className="opacity-90 leading-relaxed">{selectedSpring.legend}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">特色特点</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpring.features.map((feature, index) => (
                      <span key={index} className="bg-blue-500/30 px-2 py-1 rounded-full text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AR指南针 */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-4">
            <Compass className="w-6 h-6 text-white animate-spin" style={{ animationDuration: '8s' }} />
          </div>

          {/* AR状态指示器 */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            AR模式已激活
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedSpring(null)}
              className="flex items-center gap-2 text-blue-800 hover:text-blue-900 transition-colors duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">返回泉水列表</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-800 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">{selectedSpring.name}</h1>
                <p className="text-sm text-slate-600">AR泉水探索</p>
              </div>
            </div>
            <button
              onClick={startARMode}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Camera className="w-4 h-4" />
              启动AR
            </button>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧：泉水信息 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-64">
                <img
                  src={selectedSpring.image}
                  alt={selectedSpring.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-3xl font-bold mb-2">{selectedSpring.name}</h2>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedSpring.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-slate-700 leading-relaxed mb-6">
                  {selectedSpring.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{selectedSpring.temperature}</div>
                    <div className="text-sm text-slate-600">水温</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600 mb-1">{selectedSpring.depth}</div>
                    <div className="text-sm text-slate-600">深度</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{selectedSpring.flow}</div>
                    <div className="text-sm text-slate-600">流量</div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">{selectedSpring.features.length}</div>
                    <div className="text-sm text-slate-600">特色</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-3">特色特点</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSpring.features.map((feature, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-100 to-purple-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">历史传说</h3>
              <p className="text-slate-700 leading-relaxed">
                {selectedSpring.legend}
              </p>
            </div>
          </div>

          {/* 右侧：AR预览和热点 */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">AR探索热点</h3>
              <div className="space-y-4">
                {selectedSpring.hotspots.map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 mb-1">{hotspot.name}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{hotspot.info}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">AR体验指南</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">启动AR模式</h4>
                    <p className="text-sm text-slate-600">点击"启动AR"按钮，允许摄像头权限</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">探索热点</h4>
                    <p className="text-sm text-slate-600">点击屏幕上的星形热点获取详细信息</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">语音导览</h4>
                    <p className="text-sm text-slate-600">开启音频获得专业的文化解说</p>
                  </div>
                </div>
              </div>
            </div>

            {cameraPermission === 'denied' && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-800 mb-1">摄像头权限被拒绝</h4>
                    <p className="text-sm text-red-600 mb-3">
                      AR功能需要摄像头权限才能正常工作。请在浏览器设置中允许摄像头访问。
                    </p>
                    <button
                      onClick={requestCameraPermission}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
                    >
                      重新请求权限
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARSpringExploration;