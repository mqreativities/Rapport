import { useNavigate } from 'react-router';
import {
  ArrowLeft, Brain, ShieldCheck, Users, Calendar,
  Pin, Send, Heart, MessageCircle, MoreHorizontal, Video
} from 'lucide-react';

const posts = [
  {
    id: 1,
    author: 'Chioma A.',
    time: '2 hours ago',
    text: 'Has anyone tried the 4-7-8 breathing technique for panic attacks? It\'s been really helpful for me this week. Would love to share more tips.',
    likes: 24,
    comments: 8,
    isPinned: false,
  },
  {
    id: 2,
    author: 'Dr. Adaeze (Moderator)',
    time: '1 day ago',
    text: '📌 Welcome to this week\'s check-in! How are you all managing? Remember — small progress is still progress. Feel free to share your wins, no matter how small.',
    likes: 56,
    comments: 22,
    isPinned: true,
    isModerator: true,
  },
  {
    id: 3,
    author: 'Tunde O.',
    time: '3 hours ago',
    text: 'Started journaling as recommended by Dr. Adaeze. It feels odd at first but I think it\'s genuinely helping me identify my triggers.',
    likes: 18,
    comments: 5,
    isPinned: false,
  },
];

const pinnedResources = [
  { title: 'Anxiety Triggers Worksheet', type: 'PDF' },
  { title: 'Grounding Techniques Guide', type: 'PDF' },
  { title: 'March Live Session Recording', type: 'Video' },
];

export function CommunityDetail() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Top bar */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-[#64748B] hover:text-[#0F172A] transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
              <Brain className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <div>
              <h2 style={{ fontWeight: 700, color: '#0F172A', fontSize: '1rem', lineHeight: 1 }}>Anxiety Support</h2>
              <p className="text-[#64748B]" style={{ fontSize: '0.75rem' }}>1,248 members</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Live session banner */}
            <div className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] rounded-2xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <p style={{ fontWeight: 700 }}>Monthly Live Session</p>
                  <p className="text-[#BFDBFE]" style={{ fontSize: '0.8rem' }}>March 15, 2026 · 6:00 PM WAT</p>
                </div>
              </div>
              <button className="bg-[#FACC15] text-[#0F172A] px-4 py-2 rounded-[10px] hover:bg-[#EAB308] transition-colors flex-shrink-0" style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                Add to Calendar
              </button>
            </div>

            {/* Posts */}
            {posts.sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0)).map(post => (
              <div key={post.id} className={`bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border ${post.isPinned ? 'border-[#BFDBFE]' : 'border-[#E2E8F0]'}`}>
                {post.isPinned && (
                  <div className="flex items-center gap-1.5 text-[#3B82F6] mb-3" style={{ fontSize: '0.78rem', fontWeight: 600 }}>
                    <Pin className="w-3.5 h-3.5" /> Pinned Post
                  </div>
                )}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                      <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#3B82F6' }}>{post.author.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{post.author}</span>
                        {post.isModerator && (
                          <span className="flex items-center gap-1 bg-[#D1FAE5] text-[#166534] px-2 py-0.5 rounded-full" style={{ fontSize: '0.65rem', fontWeight: 700 }}>
                            <ShieldCheck className="w-3 h-3" /> Moderator
                          </span>
                        )}
                      </div>
                      <p className="text-[#94A3B8]" style={{ fontSize: '0.75rem' }}>{post.time}</p>
                    </div>
                  </div>
                  <button className="text-[#94A3B8] hover:text-[#64748B]">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-[#374151]" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>{post.text}</p>

                <div className="flex items-center gap-5 mt-4 pt-4 border-t border-[#F1F5F9]">
                  <button className="flex items-center gap-2 text-[#64748B] hover:text-[#EF4444] transition-colors" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-2 text-[#64748B] hover:text-[#3B82F6] transition-colors" style={{ fontSize: '0.85rem', fontWeight: 500 }}>
                    <MessageCircle className="w-4 h-4" /> {post.comments}
                  </button>
                </div>
              </div>
            ))}

            {/* Post composer */}
            <div className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
                  <span style={{ fontWeight: 700, fontSize: '0.8rem', color: '#3B82F6' }}>A</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share something with the community..."
                    className="w-full px-4 py-3 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] focus:outline-none focus:border-[#3B82F6] resize-none"
                    rows={3}
                    style={{ fontSize: '0.875rem' }}
                  />
                  <div className="flex justify-end mt-2">
                    <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 py-2 rounded-[10px] hover:bg-[#2563EB] transition-colors" style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                      <Send className="w-4 h-4" /> Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Community info */}
            <div className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>Community Info</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                  <Users className="w-4 h-4 text-[#3B82F6]" /> 1,248 members
                </div>
                <div className="flex items-center gap-3 text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                  <ShieldCheck className="w-4 h-4 text-[#22C55E]" /> Moderated by Dr. Adaeze
                </div>
                <div className="flex items-center gap-3 text-[#64748B]" style={{ fontSize: '0.875rem' }}>
                  <Calendar className="w-4 h-4 text-[#3B82F6]" /> Monthly live sessions
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
                <p className="text-[#64748B]" style={{ fontSize: '0.85rem' }}>Subscription: <span style={{ fontWeight: 700, color: '#0F172A' }}>₦2,000/month</span></p>
              </div>
            </div>

            {/* Moderator */}
            <div className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>Community Moderator</h3>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#DBEAFE] flex items-center justify-center">
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#3B82F6' }}>A</span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>Dr. Adaeze Okonkwo</p>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#22C55E]" />
                    <span className="text-[#22C55E]" style={{ fontSize: '0.72rem', fontWeight: 600 }}>Verified Counselor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinned Resources */}
            <div className="bg-white rounded-2xl p-5 shadow-[0px_6px_20px_rgba(15,23,42,0.06)] border border-[#E2E8F0]">
              <h3 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem' }}>Pinned Resources</h3>
              <div className="space-y-2">
                {pinnedResources.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-xl hover:bg-[#F1F5F9] cursor-pointer transition-colors">
                    <Pin className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
                    <div className="min-w-0">
                      <p style={{ fontWeight: 600, fontSize: '0.82rem', color: '#0F172A' }} className="truncate">{r.title}</p>
                      <p className="text-[#94A3B8]" style={{ fontSize: '0.72rem' }}>{r.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
