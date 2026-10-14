import React from 'react';
import { 
  X, Check, Clock, PackageCheck, Truck, Home, 
  MapPin, Phone, Copy, FileText, ArrowRight 
} from 'lucide-react';
import { useEcommerce } from '../../context/EcommerceContext';

const TIMELINE_STEPS = [
  { index: 1, title: 'Order Placed', desc: 'Order received and verified by system', icon: Clock },
  { index: 2, title: 'Payment Confirmed', desc: 'Secure payment cleared', icon: Check },
  { index: 3, title: 'Packed by Seller', desc: 'Quality checked & packed in IMX box', icon: PackageCheck },
  { index: 4, title: 'In Transit', desc: 'Departed central logistics hub (Tejgaon)', icon: Truck },
  { index: 5, title: 'Out for Delivery', desc: 'With courier rider for final delivery', icon: Truck },
  { index: 6, title: 'Delivered', desc: 'Delivered to your doorstep', icon: Home }
];

export const OrderTrackingModal: React.FC = () => {
  const { 
    isOrderTrackingOpen, 
    setIsOrderTrackingOpen, 
    selectedOrderForTracking, 
    showNotification 
  } = useEcommerce();

  if (!isOrderTrackingOpen || !selectedOrderForTracking) return null;

  const currentStep = selectedOrderForTracking.currentStepIndex || 2;

  const copyTracking = () => {
    navigator.clipboard.writeText(selectedOrderForTracking.trackingNumber);
    showNotification(`Copied Tracking No: ${selectedOrderForTracking.trackingNumber}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold bg-[#F57224] text-white px-2 py-0.5 rounded">
                LIVE TRACKING
              </span>
              <h2 className="text-base md:text-lg font-bold text-slate-900">
                {selectedOrderForTracking.id}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Estimated Delivery by <strong className="text-slate-800">{selectedOrderForTracking.estimatedDelivery}</strong>
            </p>
          </div>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="p-1.5 rounded-md hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          {/* Tracking Number Bar */}
          <div className="p-3 bg-orange-50/70 border border-orange-200 rounded-xl flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-500">Tracking Code: </span>
              <span className="font-mono font-bold text-slate-900 ml-1">
                {selectedOrderForTracking.trackingNumber}
              </span>
            </div>
            <button
              onClick={copyTracking}
              className="flex items-center gap-1 text-[#F57224] font-bold hover:underline"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>

          {/* Delivery Stepper Timeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Shipment Progress
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {TIMELINE_STEPS.map((step) => {
                const isPassed = currentStep >= step.index;
                const isCurrent = currentStep === step.index;
                const Icon = step.icon;

                return (
                  <div key={step.index} className="relative flex items-start gap-4">
                    {/* Step Icon Node */}
                    <div
                      className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                        isPassed
                          ? 'bg-[#F57224] text-white shadow-xs'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.index}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className={`text-xs font-bold ${isCurrent ? 'text-[#F57224]' : isPassed ? 'text-slate-800' : 'text-slate-400'}`}>
                          {step.title}
                        </p>
                        {isCurrent && (
                          <span className="text-[10px] bg-orange-100 text-[#F57224] font-extrabold px-1.5 py-0.5 rounded">
                            CURRENT STAGE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Courier Details */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Destination Address:</span>
              <p className="font-bold text-slate-800">{selectedOrderForTracking.shippingAddress.fullName}</p>
              <p className="text-slate-600 mt-0.5">{selectedOrderForTracking.shippingAddress.detailedAddress}</p>
              <p className="text-slate-500">{selectedOrderForTracking.shippingAddress.city}, {selectedOrderForTracking.shippingAddress.division}</p>
            </div>

            <div>
              <span className="text-slate-400 block mb-1">Courier Logistics Info:</span>
              <p className="font-bold text-slate-800">IMX Express Fast Logistics</p>
              <p className="text-slate-600 mt-0.5">Assigned Hub: Dhaka Central Sorting Center</p>
              <div className="flex items-center gap-1.5 text-slate-700 mt-1 font-mono text-[11px]">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Rider Hotline: +880 1711 992211</span>
              </div>
            </div>
          </div>

          {/* Items Summary in this Order */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
              Items in this Shipment ({selectedOrderForTracking.items.length})
            </span>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
              {selectedOrderForTracking.items.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between text-xs bg-white">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-md object-cover border" />
                    <div>
                      <p className="font-semibold text-slate-800 line-clamp-1">{item.product.name}</p>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity} · Price: ৳{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800 tabular-nums">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => showNotification('Electronic Tax Invoice downloaded.')}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-black"
          >
            <FileText className="w-4 h-4 text-slate-500" />
            <span>Download Invoice (PDF)</span>
          </button>
          <button
            onClick={() => setIsOrderTrackingOpen(false)}
            className="px-5 py-2 bg-[#F57224] text-white text-xs font-bold rounded-lg hover:bg-[#e06117]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
