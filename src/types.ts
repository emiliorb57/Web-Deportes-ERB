export interface ChannelSource {
  name: string;
  url: string;
  type: 'embed' | 'm3u8';
}

export interface Channel {
  id: string;
  title: string;
  category: string;
  logo: string;
  sources: ChannelSource[];
}

export interface CategoryInfo {
  name: string;
  icon: string;
}
