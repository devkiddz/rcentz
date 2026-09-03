'use client';

import Image from 'next/image';

import {
  BadgeCheck,
  Briefcase,
  FilePenLine,
  FileText,
  Mail,
  MessageCircleMore,
  Smartphone,
  UserRound
} from 'lucide-react';

import { motion, useReducedMotion } from 'motion/react';

const BROCHURE_SECTIONS = [
  {
    label: 'About',
    detail: 'Company profile',
    icon: FileText
  },
  {
    label: 'Services',
    detail: 'What we offer',
    icon: Briefcase
  },
  {
    label: 'Contact',
    detail: 'Email only',
    icon: Mail
  }
] as const;

const ACTIVE_MODULES = [
  {
    label: 'Mobile',
    value: 'Intentional',
    detail: 'Touch-first journeys',
    icon: Smartphone
  },
  {
    label: 'Profile',
    value: 'Known',
    detail: 'Visitor context',
    icon: UserRound
  },
  {
    label: 'Content',
    value: 'Editable',
    detail: 'Managed publishing',
    icon: FilePenLine
  },
  {
    label: 'Contact',
    value: 'Tracked',
    detail: 'Connected enquiries',
    icon: MessageCircleMore
  }
] as const;

export function WebsiteUpgradeScene() {
  const reduceMotion = Boolean(useReducedMotion());

  return (
    <div
      className={['grid min-h-[330px]', 'gap-3 pb-4', 'lg:grid-cols-[0.78fr_1.22fr]', 'lg:px-4'].join(' ')}>
      {/* =====================================================
          BEFORE
          ===================================================== */}

      <div className="overflow-hidden rounded-[20px] border border-border bg-background/88 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-muted">Before</p>

            <p className="mt-1.5 text-[15px] font-semibold">Static brochure</p>
          </div>

          <FilePenLine className="size-[18px] text-muted" />
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-surface-muted/25 p-3">
          {/* MINI NAV */}

          <div className="flex items-center justify-between gap-4">
            <p className="text-[8px] font-semibold">Meridian Studio</p>

            <div className="flex items-center gap-2">
              {['About', 'Services', 'Contact'].map(item => (
                <span key={item} className="font-mono text-[5px] uppercase tracking-[0.07em] text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* STATIC HERO */}

          <div className="relative mt-4 h-[88px] overflow-hidden rounded-xl border border-border">
            <Image
              src="/images/services/business-management/black-operations-01.jpg"
              alt=""
              fill
              sizes="430px"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/74 to-background/20" />

            <div className="absolute inset-y-0 left-0 flex max-w-[74%] flex-col justify-center p-3">
              <p className="text-[11px] font-semibold leading-tight">A polished online presence.</p>

              <p className="mt-1 text-[7px] leading-3.5 text-muted">Information in. Email out.</p>

              <span className="mt-2 w-fit rounded-full border border-border bg-background/80 px-2 py-1 font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
                Contact us
              </span>
            </div>
          </div>

          {/* ACTUAL CONTENT CARDS */}

          <div className="mt-3 grid grid-cols-3 gap-2">
            {BROCHURE_SECTIONS.map(item => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="rounded-xl border border-border bg-background/72 p-2.5">
                  <Icon className="size-3 text-muted" />

                  <p className="mt-2 text-[8px] font-medium">{item.label}</p>

                  <p className="mt-1 text-[6px] leading-3 text-muted">{item.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-background/65 px-3 py-2">
            <span className="font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
              Contact us → email
            </span>

            <span className="font-mono text-[5px] uppercase tracking-[0.08em] text-muted">
              Manual follow-up
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          AFTER
          ===================================================== */}

      <div className="overflow-hidden rounded-[20px] border border-border-strong bg-background/94 p-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[7px] uppercase tracking-[0.15em] text-theme-accent">After</p>

            <p className="mt-1.5 text-[15px] font-semibold">Active business experience</p>
          </div>

          <BadgeCheck className="size-[18px] text-theme-accent" />
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-[1.05fr_0.95fr]">
          {/* VISITOR EXPERIENCE */}

          <div className="overflow-hidden rounded-2xl border border-border bg-surface-muted/25">
            <div className="flex h-9 items-center gap-2 border-b border-border px-3">
              <div className="flex size-5 items-center justify-center rounded-full border border-border bg-background">
                <span className="font-mono text-[7px] font-semibold">R</span>
              </div>

              <div className="h-4 flex-1 rounded-full border border-border bg-background/70" />

              <span className="size-1.5 rounded-full bg-theme-accent" />
            </div>

            <div className="p-3">
              <motion.div
                className="rounded-xl border border-border bg-background/75 p-3"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -2, 0]
                      }
                }
                transition={{
                  duration: 6.5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                    Visitor profile
                  </p>

                  <span className="font-mono text-[5px] uppercase tracking-[0.08em] text-theme-accent">
                    Live
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="relative size-10 overflow-hidden rounded-full border border-border bg-surface-muted">
                    <Image
                      src="/images/services/business-management/black-client-01.jpg"
                      alt=""
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-medium">New website enquiry</p>

                    <p className="mt-0.5 text-[7px] text-muted">Business redesign · Lagos</p>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg border border-border bg-surface-muted/35 p-2">
                    <p className="font-mono text-[5px] uppercase tracking-[0.08em] text-muted">Interest</p>

                    <p className="mt-1 text-[7px] font-medium">Business website</p>
                  </div>

                  <div className="rounded-lg border border-border bg-surface-muted/35 p-2">
                    <p className="font-mono text-[5px] uppercase tracking-[0.08em] text-muted">Status</p>

                    <p className="mt-1 text-[7px] font-medium text-theme-accent">Qualified</p>
                  </div>
                </div>
              </motion.div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-border bg-background/70 p-2.5">
                  <MessageCircleMore className="size-3.5 text-theme-accent" />

                  <p className="mt-2 text-[8px] font-medium">Live enquiry</p>

                  <p className="mt-1 text-[6px] text-muted">Conversation captured</p>
                </div>

                <div className="rounded-xl border border-border bg-background/70 p-2.5">
                  <Mail className="size-3.5 text-theme-accent" />

                  <p className="mt-2 text-[8px] font-medium">Follow-up</p>

                  <p className="mt-1 text-[6px] text-muted">Reminder scheduled</p>
                </div>
              </div>
            </div>
          </div>

          {/* SYSTEM CAPABILITIES */}

          <div className="grid grid-cols-2 gap-2">
            {ACTIVE_MODULES.map((module, index) => {
              const Icon = module.icon;

              return (
                <motion.div
                  key={module.label}
                  className="rounded-xl border border-border bg-surface-muted/25 p-3"
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 0.97
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    delay: 0.12 + index * 0.1
                  }}>
                  <div className="flex items-center justify-between">
                    <Icon className="size-3.5 text-theme-accent" />

                    <span className="size-1.5 rounded-full bg-theme-accent" />
                  </div>

                  <p className="mt-3 font-mono text-[7px] uppercase tracking-[0.1em] text-muted">
                    {module.label}
                  </p>

                  <p className="mt-1 text-[9px] font-medium">{module.value}</p>

                  <p className="mt-1 text-[6px] leading-3 text-muted">{module.detail}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
