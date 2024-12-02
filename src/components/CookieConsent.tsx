"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import { FaCookieBite, FaShieldAlt, FaChartLine, FaCog } from 'react-icons/fa';

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
}

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false); // Initialize as false
  const [showDetails, setShowDetails] = useState(false);
  const [settings, setSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    preferences: false,
  });

  useEffect(() => {
    // Check if user has already made a choice after component mounts
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      // Only show if no consent exists
      setShowConsent(true);
    } else {
      try {
        const savedSettings = JSON.parse(consent);
        // Validate saved settings structure
        if (typeof savedSettings === 'object' && 'necessary' in savedSettings) {
          setSettings(savedSettings);
        } else {
          throw new Error('Invalid cookie consent format');
        }
      } catch (error) {
        // Reset to default if parsing fails
        Cookies.remove('cookie-consent');
        setShowConsent(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allSettings = {
      necessary: true,
      analytics: true,
      preferences: true,
    };
    saveSettings(allSettings);
  };

  const handleSaveSettings = () => {
    saveSettings(settings);
  };

  const saveSettings = (selectedSettings: CookieSettings) => {
    try {
      // Save settings for 1 year
      Cookies.set('cookie-consent', JSON.stringify(selectedSettings), { 
        expires: 365,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production'
      });
      
      // Apply cookie settings
      if (selectedSettings.analytics) {
        enableAnalytics();
      } else {
        disableAnalytics();
      }

      if (selectedSettings.preferences) {
        Cookies.set('theme-preference', 'light', { 
          expires: 365,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
        Cookies.set('language-preference', 'th', { 
          expires: 365,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production'
        });
      } else {
        Cookies.remove('theme-preference');
        Cookies.remove('language-preference');
      }

      setSettings(selectedSettings);
      setShowConsent(false);
    } catch (error) {
      console.error('Error saving cookie settings:', error);
    }
  };

  const enableAnalytics = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  };

  const disableAnalytics = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        'analytics_storage': 'denied'
      });
    }
  };

  if (!showConsent) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg shadow-lg border-t border-amber-100"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <FaCookieBite className="text-3xl text-amber-600 flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-sukhumvitBold text-amber-800 mb-2">
                  การใช้คุกกี้บนเว็บไซต์
                </h3>
                <p className="text-amber-700 text-sm max-w-2xl">
                  เว็บไซต์นี้ใช้คุกกี้เพื่อพัฒนาประสบการณ์การใช้งานของคุณ 
                  คุกกี้บางประเภทมีความจำเป็นต่อการทำงานของเว็บไซต์ 
                  ในขณะที่คุกกี้อื่นๆ ช่วยให้เราเข้าใจการใช้งานเว็บไซต์ของคุณได้ดีขึ้น
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDetails(!showDetails)}
                className="px-4 py-2 text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-50 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-expanded={showDetails}
              >
                ตั้งค่าคุกกี้
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                ยอมรับทั้งหมด
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 overflow-hidden"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <FaShieldAlt className="text-amber-600" aria-hidden="true" />
                      <h4 className="font-sukhumvitBold text-amber-800">คุกกี้ที่จำเป็น</h4>
                    </div>
                    <p className="text-sm text-amber-700 mb-3">
                      จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์
                    </p>
                    <input
                      type="checkbox"
                      checked={settings.necessary}
                      disabled
                      className="accent-amber-600"
                      aria-label="คุกกี้ที่จำเป็น (ไม่สามารถปิดได้)"
                    />
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <FaChartLine className="text-amber-600" aria-hidden="true" />
                      <h4 className="font-sukhumvitBold text-amber-800">คุกกี้วิเคราะห์</h4>
                    </div>
                    <p className="text-sm text-amber-700 mb-3">
                      ช่วยให้เราเข้าใจการใช้งานเว็บไซต์
                    </p>
                    <input
                      type="checkbox"
                      checked={settings.analytics}
                      onChange={(e) => setSettings({ ...settings, analytics: e.target.checked })}
                      className="accent-amber-600"
                      aria-label="คุกกี้วิเคราะห์"
                    />
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <FaCog className="text-amber-600" aria-hidden="true" />
                      <h4 className="font-sukhumvitBold text-amber-800">คุกกี้การตั้งค่า</h4>
                    </div>
                    <p className="text-sm text-amber-700 mb-3">
                      จดจำการตั้งค่าที่คุณเลือก
                    </p>
                    <input
                      type="checkbox"
                      checked={settings.preferences}
                      onChange={(e) => setSettings({ ...settings, preferences: e.target.checked })}
                      className="accent-amber-600"
                      aria-label="คุกกี้การตั้งค่า"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSaveSettings}
                    className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    บันทึกการตั้งค่า
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}