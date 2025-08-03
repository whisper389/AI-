import React from 'react';
import { MessageCircle, Route, BookOpen, Search, Users, Zap } from 'lucide-react';

interface FeaturesProps {
  onChatClick: () => void;
  onFolkloreClick: () => void;
  onHistoryClick: () => void;
  onRoutesClick: () => void;
  onARClick: () => void;
}

const Features: React.FC<FeaturesProps> = ({ onChatClick, onFolkloreClick, onHistoryClick, onRoutesClick, onARClick }) => {
  const features = [
    {
      icon: MessageCircle,
      title: '文化智能问答',
      description: 'AI向导3秒响应，15秒内提供权威解答，专注济南文化内容',
      color: 'bg-blue-600',
      action: onChatClick
    },
    {
      icon: Route,
      title: '文化旅游路线',
      description: '个性化文化探索旅程规划，深度体验济南文化魅力',
      color: 'bg-green-600',
      action: onRoutesClick
    },
    {
      icon: BookOpen,
      title: '历史故事讲述',
      description: '沉浸式互动历史体验，聆听千年泉城的动人故事',
      color: 'bg-purple-600',
      action: onHistoryClick
    },
    {
      icon: Search,
      title: '地方志检索解读',
      description: '古籍文献智能检索，AI解读历史文献精髓',
      color: 'bg-amber-600',
      action: () => {}
    },
    {
      icon: Users,
      title: '民俗体验指南',
      description: '传统民俗活动参与指南，深度体验济南民俗文化',
      color: 'bg-red-600',
      action: onFolkloreClick
    },
    {
      icon: Zap,
      title: 'AR泉水探索',
      description: '增强现实技术体验名泉，科技与文化的完美融合',
      color: 'bg-indigo-600',
      action: onARClick
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 relative inline-block">
            六大核心功能
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-yellow-600 rounded-full"></div>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mt-8">
            AI技术赋能传统文化，打造全方位济南文化体验平台
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-blue-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer"
              onClick={feature.action}
            >
              <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h4 className="text-2xl font-bold text-slate-800 mb-4">
                {feature.title}
              </h4>
              
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;