import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

const LOVE_MESSAGE = `A Birthday Wish For My Bhuviii ❤️

To my sweetest Pattu,
My adorable Kitty,
My precious Kutty,
My beautiful Chello,
My golden Thango,
My forever Baby,
My everything... Bi.

Happy Birthday, my love.

If I had one wish today, it wouldn't be for the stars to shine brighter...

It would simply be for your smile to stay exactly as it is—because that smile is where my world begins and ends.

I hope you never have to question how loved you are.

Because if words could measure love, every language would still fall short of what I feel for you.

You deserve mornings that begin with peace,
Afternoons filled with laughter,
Evenings wrapped in comfort,
And nights where your only worry is deciding which dream to chase next.

And if life ever becomes too heavy...

Come here.

My chest will always be your resting pillow,
My arms will always be your safest home,
My heartbeat will always whisper,
"You're okay now, Pattu... I'm here."

Whenever your eyes fill with tears,
I want mine to be the first shoulder you look for.

Whenever you're tired,
I want my embrace to become your favorite place to disappear into.

Whenever you're happy,
I want to celebrate every little victory as if it were my own.

Because your happiness has somehow become mine.

Bhuviii...

I don't want to love you only on the easy days.

I want to love you when you're overthinking.

When you're angry.

When you're sleepy.

When you're stubborn.

When you're insecure.

When you're silent.

When you feel like you're "too much."

Because to me...

You'll never be too much.

You'll always be the girl I choose.

Again.

And again.

And again.

I want to be the person who reminds you that you're enough.

The one who tells you to eat on time.

The one who asks if you reached safely.

The one who remembers the tiny details everyone else forgets.

The one who listens to your random stories at 2 AM.

The one who kisses your forehead after every hard day.

The one who stays.

No matter what.

My sweet Kitty...

You never have to compete for my attention.

You already have it.

You never have to earn my love.

You already own it.

You never have to wonder if you're my priority.

Because before anything else...

It's always you.

Always my Bi.

I promise...

To protect your peace.

To cheer for your dreams louder than anyone else.

To hold your hand through every victory and every failure.

To remind you how beautiful you are on the days you forget.

To tell you "I'm proud of you."

Even for the smallest things.

To annoy you.

To tease you.

To spoil you.

To make you laugh until your stomach hurts.

To love every version of you.

Not just the smiling one.

You once asked me what home feels like.

I didn't know the answer then.

Now I do.

Home...

Is wherever you are.

Whether we're talking for hours,

Sitting together in complete silence,

Or simply holding hands...

If it's with you,

I'm already home.

Pattu...

If the whole world stood on one side...

And you stood on the other...

Don't even look back.

I'll already be standing beside you.

Always.

Not because I have to.

Because I want to.

Every single day.

I hope this birthday gives you everything you've ever prayed for.

And if life forgets to give you something...

I'll spend my whole life trying to make up for it.

I want to be the reason your heart feels safe.

The reason you smile without realizing it.

The reason you believe that forever can actually exist.

So today...

Smile a little more.

Laugh a little louder.

Dream a little bigger.

Because the world became a far more beautiful place on the day my Bhuviii was born.

Happy Birthday, my beautiful girl.

My Pattu.

My Kitty.

My Kutty.

My Chello.

My Thango.

My Baby.

My Bi.

My safest place.

My favorite person.

My greatest blessing.

My today.

My tomorrow.

My always.

I love you more than yesterday, less than tomorrow, and in ways even forever cannot fully describe. ❤️`;

export const LoveSection: React.FC = () => {
  return (
    <motion.section
      id="my-love"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
      className="w-full max-w-5xl mx-auto mt-16"
    >
      <div className="liquid-glass rounded-[48px] p-8 md:p-16 relative overflow-hidden jelly-hover border border-rose-500/30 shadow-[0_32px_128px_-32px_rgba(244,63,94,0.3)] bg-surface-container/40">
        {/* Changed gradient colors to rose/pink for a romantic feel */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-rose-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
          </div>

          <h2 className="font-['Plus_Jakarta_Sans'] text-4xl md:text-6xl text-on-surface mb-2 tracking-tight glow-text font-bold" style={{ textShadow: '0 0 30px rgba(244,63,94,0.5)' }}>
            MY Love to You
          </h2>

          <div className="w-full max-w-3xl mx-auto relative group">
            {/* Scrollable Container */}
            <div className="font-['Inter'] text-lg md:text-xl text-on-surface-variant leading-[1.8] font-light max-h-[400px] md:max-h-[500px] overflow-y-auto whitespace-pre-wrap text-left p-6 md:p-8 rounded-3xl bg-black/20 border border-white/5 custom-scrollbar shadow-inner backdrop-blur-sm">
              {LOVE_MESSAGE}
            </div>
            
            {/* Fade effect at the bottom to indicate scrolling */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#111111]/80 to-transparent rounded-b-3xl pointer-events-none"></div>
          </div>

          <div className="pt-4 flex items-center gap-2 text-xs font-semibold tracking-wider text-rose-400/80 uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Forever yours</span>
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
