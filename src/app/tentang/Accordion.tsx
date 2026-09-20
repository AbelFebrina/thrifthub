'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItem {
  question: string;
  answer: string;
}

const accordionItems: AccordionItem[] = [
  {
    question: 'Kenapa transaksi di ThriftHub aman?',
    answer: 'Semua transaksi dilindungi oleh sistem rekber (rekening bersama) yang menahan dana buyer hingga barang diterima dan sesuai deskripsi. Tidak ada transfer langsung ke seller.',
  },
  {
    question: 'Bagaimana proses kurasi produk dilakukan?',
    answer: 'Setiap produk diverifikasi oleh tim kurasi kami — mulai dari kondisi fisik, keaslian, hingga deskripsi yang akurat. Hanya produk yang lolos seleksi yang ditampilkan.',
  },
  {
    question: 'Apa bedanya belanja preloved di ThriftHub?',
    answer: 'Kami mengkurasi produk thrift berkualitas tinggi dengan gaya modern. Setiap barang memiliki foto asli, deskripsi detail, dan jaminan kondisi seperti yang ditampilkan.',
  },
  {
    question: 'Apakah ada garansi atau retur jika produk tidak sesuai?',
    answer: 'Ya. Jika barang tidak sesuai dengan deskripsi, kamu bisa mengajukan klaim dan dana akan dikembalikan melalui sistem rekber. Tim dukungan kami siap membantu 7 hari dalam seminggu.',
  },
  {
    question: 'Bagaimana pengiriman dan berapa lama estimasinya?',
    answer: 'Kami bekerja sama dengan J&T, GoSend, GrabExpress, dan ekspedisi reguler. Pengiriman biasanya 1-3 hari untuk area Malang Raya, 3-7 hari untuk wilayah Jawa.',
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {accordionItems.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-neutral-200 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#E17100]/40"
          >
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-amber-50/30 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-neutral-900 text-base leading-snug">
                {item.question}
              </span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 shrink-0 text-[#E17100] transition-transform duration-300" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-300" aria-hidden="true" />
              )}
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
              style={{ display: 'grid' }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-neutral-600 text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

