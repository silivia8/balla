import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface PasscodeGateProps {
  onSuccess: () => void;
}

export function PasscodeGate({ onSuccess }: PasscodeGateProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    
    // Artificial delay for "premium" feel
    setTimeout(() => {
      if (passcode === 'admin') {
        onSuccess();
      } else {
        setError(true);
        setPasscode('');
        setIsVerifying(false);
        // Reset error after animation
        setTimeout(() => setError(false), 1000);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-[#050505] flex items-center justify-center p-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-8 md:p-12 shadow-2xl"
      >
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <motion.div
              animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <Lock className={`w-8 h-8 ${error ? 'text-red-500' : 'text-white/80'}`} />
            </motion.div>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black tracking-tighter text-white uppercase">Vault Access</h1>
            <p className="text-white/40 text-sm font-medium leading-relaxed">
              This collection is encrypted. <br />Please enter your administrator passcode.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="relative group">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode"
                autoFocus
                className={`w-full bg-white/5 border ${error ? 'border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:ring-white/20'} rounded-2xl py-4 px-6 text-center text-xl font-bold tracking-[0.5em] focus:outline-none focus:ring-4 transition-all placeholder:text-white/10 placeholder:tracking-normal placeholder:font-medium placeholder:text-sm`}
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || !passcode}
              className="w-full h-14 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 disabled:bg-white/20 disabled:text-white/20 transition-all active:scale-95 overflow-hidden relative group"
            >
              <AnimatePresence mode="wait">
                {isVerifying ? (
                  <motion.div
                    key="verifying"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                    <span>VERIFYING</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2"
                  >
                    <span>GRANT ACCESS</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="flex items-center gap-2 text-white/20 pt-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase tracking-widest">End-to-End Encrypted</span>
          </div>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 right-0 text-center pointer-events-none">
        <span className="text-white/10 font-black tracking-[0.3em] text-sm">LUMINA GALLERY ENGINE</span>
      </div>
    </div>
  );
}
