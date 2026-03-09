'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, QrCode, Copy, Check } from 'lucide-react'
import Image from 'next/image'

const GiftSection = () => {
  const [copied, setCopied] = useState(false)

  const accountNumber = "625704060350639" // Giả định số tài khoản
  const bankName = "VIB"

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="gift" className="py-20 px-4 bg-[#fdf8f5]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Heart className="w-12 h-12 text-[#d4a373] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif text-[#5e503f] mb-4">Gửi Tiền Mừng</h2>
          <p className="text-[#8d99ae] max-w-2xl mx-auto mb-16">
            Sự hiện diện của bạn là món quà lớn nhất đối với chúng mình.
            Nếu bạn muốn gửi thêm quà mừng, chúng mình xin trân trọng cảm ơn.
          </p>
        </motion.div>

        <div className="flex justify-center">
          {/* QR Code Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-3xl shadow-xl border border-[#e9ecef] max-w-md w-full"
          >
            <div className="flex items-center gap-3 mb-6 justify-center">
              <QrCode className="text-[#d4a373]" />
              <h3 className="text-xl font-semibold text-[#5e503f]">Mừng cưới qua QR</h3>
            </div>

            <div className="relative group aspect-square mb-6 overflow-hidden rounded-2xl border-4 border-[#fdf8f5]">
              <Image
                src="/images/qr.jfif"
                alt="QR Code Mừng Cưới"
                fill
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="space-y-4 text-left">
              <div className="p-4 bg-[#fdf8f5] rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs text-[#8d99ae] uppercase tracking-wider">Ngân hàng</p>
                  <p className="font-medium text-[#5e503f]">{bankName}</p>
                </div>
              </div>
              <div className="p-4 bg-[#fdf8f5] rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs text-[#8d99ae] uppercase tracking-wider">Số tài khoản</p>
                  <p className="font-medium text-[#5e503f]">{accountNumber}</p>
                </div>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-white rounded-lg transition-colors text-[#d4a373]"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GiftSection
