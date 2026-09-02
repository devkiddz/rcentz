'use client';

import { CheckCircle2, Database, FileText, FolderOpen, Gauge, ShieldCheck } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';

const RECORDS = [
  {
    model: 'User',
    command: 'prisma.user.create()',
    id: 'usr_4821',
    detail: 'role CLIENT · status ACTIVE'
  },
  {
    model: 'Project',
    command: 'prisma.project.create()',
    id: 'prj_2094',
    detail: 'progress 36 · visibility CLIENT'
  },
  {
    model: 'Milestone',
    command: 'prisma.milestone.update()',
    id: 'mil_1048',
    detail: 'status COMPLETE · progress 100'
  },
  {
    model: 'Activity',
    command: 'prisma.activity.create()',
    id: 'act_7732',
    detail: 'type UPDATE · source SYSTEM'
  }
] as const;

const DATABASES = [
  {
    name: 'PostgreSQL',
    meta: 'Relational database'
  },
  {
    name: 'MySQL',
    meta: 'Relational database'
  },
  {
    name: 'MongoDB',
    meta: 'Document database'
  },
  {
    name: 'SQLite',
    meta: 'Embedded database'
  },
  {
    name: 'CockroachDB',
    meta: 'Distributed SQL'
  },
  {
    name: 'SQL Server',
    meta: 'Enterprise SQL'
  }
] as const;

const PIPELINE = ['Validating', 'Transforming', 'Persisting'] as const;

const RECORD_DURATION = 2750;
const DATABASE_DURATION = 1800;

type TypewriterTextProps = {
  text: string;
  reduceMotion: boolean;
  delay?: number;
  speed?: number;
  className?: string;
};

function TypewriterText({ text, reduceMotion, delay = 0, speed = 30, className }: TypewriterTextProps) {
  const [length, setLength] = useState(reduceMotion ? text.length : 0);

  useEffect(() => {
    if (reduceMotion) return;

    let interval: number | undefined;

    const timeout = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setLength(current => {
          if (current >= text.length) {
            if (interval) {
              window.clearInterval(interval);
            }

            return current;
          }

          return current + 1;
        });
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(timeout);

      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [delay, reduceMotion, speed, text]);

  return (
    <span className={className}>
      {text.slice(0, length)}

      {!reduceMotion && length < text.length ? (
        <motion.span
          animate={{
            opacity: [1, 0, 1]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity
          }}
          className="ml-0.5 inline-block h-[1em] w-px bg-theme-accent align-[-0.1em]"
        />
      ) : null}
    </span>
  );
}

export function DatabaseRecordingStory() {
  const [recordIndex, setRecordIndex] = useState(0);

  const [databaseIndex, setDatabaseIndex] = useState(0);

  const reduceMotion = Boolean(useReducedMotion());

  useEffect(() => {
    if (reduceMotion || recordIndex >= RECORDS.length - 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setRecordIndex(current => current + 1);
    }, RECORD_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [recordIndex, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const timeout = window.setTimeout(() => {
      setDatabaseIndex(current => (current + 1) % DATABASES.length);
    }, DATABASE_DURATION);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [databaseIndex, reduceMotion]);

  const visibleIndex = reduceMotion ? RECORDS.length - 1 : recordIndex;

  const visibleDatabaseIndex = reduceMotion ? 0 : databaseIndex;

  const record = RECORDS[visibleIndex];

  const database = DATABASES[visibleDatabaseIndex];

  const pipelineIndex = Math.min(visibleIndex, PIPELINE.length - 1);

  return (
    <div className="relative min-h-[440px] overflow-visible">
      {/* =====================================================
          AMBIENT LIGHT
          ===================================================== */}

      <div
        aria-hidden="true"
        className={[
          'absolute',
          'left-1/2 top-1/2',
          'h-[390px] w-[390px]',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'rounded-full',
          'bg-theme-accent-faint',
          'blur-[100px]'
        ].join(' ')}
      />

      {/* =====================================================
          DATA ROUTES
          ===================================================== */}

      <svg
        aria-hidden="true"
        viewBox="0 0 700 440"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full text-theme-accent">
        {[
          'M120 135 C210 135 230 190 315 200',
          'M390 185 C485 170 515 120 595 120',
          'M390 250 C500 250 525 340 605 340',
          'M310 270 C245 310 220 355 140 355'
        ].map((path, index) => (
          <motion.path
            key={path}
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="3 8"
            opacity={0.3 - index * 0.04}
            animate={
              reduceMotion
                ? undefined
                : {
                    strokeDashoffset: -90
                  }
            }
            transition={{
              duration: 5 + index * 0.6,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </svg>

      {/* =====================================================
          APPLICATION EVENT
          ===================================================== */}

      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                x: -16
              }
        }
        animate={{
          opacity: 1,
          x: 0
        }}
        className={[
          'absolute',
          'left-[1%] top-[8%]',
          'z-40',
          'w-[205px]',
          'rounded-2xl',
          'border border-border',
          'bg-background/84',
          'p-4',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-theme-accent-soft">
            <FileText className="size-4 text-theme-accent" />
          </span>

          <div>
            <p className="text-[13px] font-semibold">Application event</p>

            <p className="mt-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
              Incoming mutation
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={record.id}
            initial={{
              opacity: 0,
              y: 7
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -5
            }}
            className="mt-4">
            <TypewriterText
              key={`${record.id}-command`}
              text={record.command}
              reduceMotion={reduceMotion}
              speed={25}
              className="font-mono text-[11px] font-medium text-theme-accent"
            />

            <div className="mt-3">
              <TypewriterText
                key={`${record.id}-id`}
                text={`id: ${record.id}`}
                reduceMotion={reduceMotion}
                delay={500}
                speed={28}
                className="font-mono text-[9px] text-foreground"
              />
            </div>

            <div className="mt-1.5">
              <TypewriterText
                key={`${record.id}-detail`}
                text={record.detail}
                reduceMotion={reduceMotion}
                delay={850}
                speed={18}
                className="font-mono text-[8px] leading-4 text-muted"
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* =====================================================
          SIX-LAYER DATABASE ENGINE
          ===================================================== */}

      <div
        className={[
          'absolute',
          'left-1/2 top-1/2',
          'z-30',
          'h-[390px]',
          'w-[260px]',
          '-translate-x-1/2',
          '-translate-y-1/2'
        ].join(' ')}>
        {/* BASE ORBIT */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotate: 360
                }
          }
          transition={{
            duration: 19,
            repeat: Infinity,
            ease: 'linear'
          }}
          className={[
            'absolute',
            'bottom-[-1%]',
            'left-1/2',
            'h-[78px]',
            'w-[118%]',
            '-translate-x-1/2',
            'rounded-[50%]',
            'border',
            'border-theme-accent/20'
          ].join(' ')}>
          <span className="absolute right-[12%] top-[9%] size-2 rounded-full bg-theme-accent shadow-[0_0_18px_var(--theme-accent)]" />
        </motion.div>

        {/* SIX DATABASE LAYERS */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  rotateZ: [0, 1, 0, -1, 0]
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute inset-0">
          {Array.from({
            length: 6
          }).map((_, layer) => (
            <div
              key={layer}
              style={{
                top: `${layer * 13}%`
              }}
              className={['absolute', 'left-1/2', 'h-[105px]', 'w-[94%]', '-translate-x-1/2'].join(' ')}>
              {/* BODY */}

              <div
                className={[
                  'absolute',
                  'inset-x-0',
                  'top-[27px]',
                  'h-[64px]',
                  'overflow-hidden',
                  'border-x',
                  'border-theme-accent/22',
                  'bg-background/76',
                  'backdrop-blur-xl'
                ].join(' ')}>
                {/* MOVING SIGNAL NODES */}

                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: ['-40%', '150%']
                        }
                  }
                  transition={{
                    duration: 4.5 + layer * 0.45,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: layer * 0.35
                  }}
                  className="absolute top-[15px] flex gap-3">
                  {Array.from({
                    length: 5
                  }).map((_, node) => (
                    <motion.span
                      key={node}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [0.2, 1, 0.25],
                              scale: [0.75, 1.25, 0.8]
                            }
                      }
                      transition={{
                        duration: 1.4 + node * 0.3,
                        delay: node * 0.4,
                        repeat: Infinity,
                        ease: 'easeInOut'
                      }}
                      className="size-1.5 rounded-full bg-theme-accent shadow-[0_0_10px_var(--theme-accent)]"
                    />
                  ))}
                </motion.div>

                {/* SERVER VENTS */}

                <div className="absolute bottom-[12px] left-[16px] flex gap-1">
                  {Array.from({
                    length: 8
                  }).map((_, vent) => (
                    <span key={vent} className="h-4 w-[2px] rounded-full bg-foreground/18" />
                  ))}
                </div>

                {/* STATUS LIGHTS */}

                <div className="absolute bottom-[11px] right-[16px] flex gap-1.5 rounded-md border border-theme-accent/15 bg-background/70 px-2 py-1">
                  {Array.from({
                    length: 3
                  }).map((_, light) => (
                    <motion.span
                      key={light}
                      animate={
                        reduceMotion
                          ? undefined
                          : {
                              opacity: [0.25, 1, 0.35]
                            }
                      }
                      transition={{
                        duration: 1.3 + light * 0.4,
                        repeat: Infinity,
                        delay: light * 0.5 + layer * 0.2
                      }}
                      className="size-1.5 rounded-full bg-theme-accent"
                    />
                  ))}
                </div>

                {/* ROTATION HIGHLIGHT */}

                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          x: ['-170%', '350%']
                        }
                  }
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: layer * 0.4
                  }}
                  className="absolute inset-y-0 w-[42px] rotate-[8deg] bg-gradient-to-r from-transparent via-theme-accent/10 to-transparent blur-sm"
                />
              </div>

              {/* TOP ELLIPSE */}

              <div
                className={[
                  'absolute',
                  'inset-x-0 top-0',
                  'h-[55px]',
                  'rounded-[50%]',
                  'border',
                  'border-theme-accent/30',
                  'bg-background/92',
                  'shadow-[0_0_22px_var(--theme-accent-faint)]'
                ].join(' ')}
              />

              {/* BOTTOM CURVE */}

              <div
                className={[
                  'absolute',
                  'inset-x-0 bottom-0',
                  'h-[44px]',
                  'rounded-[50%]',
                  'border-b',
                  'border-theme-accent/22'
                ].join(' ')}
              />
            </div>
          ))}
        </motion.div>

        {/* DATABASE IDENTITY */}

        <div
          className={[
            'absolute',
            'left-1/2',
            'top-[46%]',
            'z-50',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'min-w-[150px]',
            'rounded-xl',
            'border',
            'border-theme-accent/24',
            'bg-background/88',
            'px-4 py-3',
            'text-center',
            'shadow-xl',
            'backdrop-blur-xl'
          ].join(' ')}>
          <Database className="mx-auto size-5 text-theme-accent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={database.name}
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 5
                    }
              }
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -5
              }}
              transition={{
                duration: 0.35
              }}>
              <p className="mt-2 text-[14px] font-semibold tracking-[-0.03em]">{database.name}</p>

              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-muted">
                {database.meta}
              </p>
            </motion.div>
          </AnimatePresence>

          <p className="mt-2 font-mono text-[8px] font-medium uppercase tracking-[0.13em] text-theme-accent">
            Next.js ready
          </p>
        </div>
      </div>

      {/* =====================================================
          STRUCTURED DATA
          ===================================================== */}

      <div
        className={[
          'absolute',
          'right-[1%] top-[9%]',
          'z-40',
          'w-[190px]',
          'rounded-2xl',
          'border border-border',
          'bg-background/84',
          'p-4',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-theme-accent-soft">
            <FolderOpen className="size-4 text-theme-accent" />
          </span>

          <p className="text-[13px] font-semibold">Structured data</p>
        </div>

        <div className="mt-4 space-y-2.5">
          {PIPELINE.map((step, index) => {
            const completed = index <= pipelineIndex;

            return (
              <div key={step} className="flex items-center gap-2">
                <span
                  className={[
                    'size-2',
                    'rounded-full',
                    completed ? 'bg-theme-accent' : 'border border-border'
                  ].join(' ')}
                />

                <span className="text-[10px] text-muted">{step}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================
          DATA INTEGRITY
          ===================================================== */}

      <div
        className={[
          'absolute',
          'bottom-[4%] left-[2%]',
          'z-40',
          'w-[175px]',
          'rounded-2xl',
          'border border-border',
          'bg-background/84',
          'p-4',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-theme-accent-soft">
            <ShieldCheck className="size-4 text-theme-accent" />
          </span>

          <p className="text-[13px] font-semibold">Data integrity</p>
        </div>

        <div className="mt-3 space-y-2">
          {['Constraints', 'Relations'].map(item => (
            <div key={item} className="flex items-center gap-2">
              <CheckCircle2 className="size-3 text-theme-accent" />

              <span className="text-[10px] text-muted">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          LIVE DATABASE STATUS
          ===================================================== */}

      <div
        className={[
          'absolute',
          'bottom-[4%] right-[2%]',
          'z-40',
          'w-[185px]',
          'rounded-2xl',
          'border border-border',
          'bg-background/86',
          'p-4',
          'shadow-xl',
          'backdrop-blur-xl'
        ].join(' ')}>
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-theme-accent-soft">
            <Gauge className="size-4 text-theme-accent" />
          </span>

          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={database.name}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                className="text-[13px] font-semibold">
                {database.name}
              </motion.p>
            </AnimatePresence>

            <p className="mt-0.5 font-mono text-[8px] text-muted">{visibleIndex + 1} records written</p>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-theme-accent opacity-30" />

            <span className="relative inline-flex size-2 rounded-full bg-theme-accent" />
          </span>

          <span className="font-mono text-[8px] font-medium uppercase tracking-[0.14em] text-theme-accent">
            live
          </span>
        </div>
      </div>

      {/* =====================================================
          MOVING DATA PACKET
          ===================================================== */}

      {!reduceMotion ? (
        <motion.span
          key={record.id}
          initial={{
            left: '23%',
            top: '34%',
            opacity: 0,
            scale: 0.4
          }}
          animate={{
            left: '47%',
            top: '48%',
            opacity: [0, 1, 1, 0],
            scale: [0.4, 1.2, 1, 0.7]
          }}
          transition={{
            duration: 1.35,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute z-[60] size-3 rounded-full bg-theme-accent shadow-[0_0_24px_var(--theme-accent)]"
        />
      ) : null}
    </div>
  );
}
