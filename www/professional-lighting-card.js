class ProfessionalLightingCard extends HTMLElement {
  setConfig(config) {
    if (!config) throw new Error('Invalid configuration');
    this.config = config;
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.updateContent();
  }

  render() {
    if (!this.card) {
      this.card = document.createElement('ha-card');
      this.card.innerHTML = `
        <style>
          .prof-lighting {
            background: linear-gradient(135deg, #09090b 0%, #18181b 100%);
            color: #fff;
            padding: 24px;
            font-family: -apple-system, system-ui, sans-serif;
            min-height: 600px;
            position: relative;
            overflow: hidden;
          }
          .prof-lighting::before, .prof-lighting::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            filter: blur(80px);
            opacity: 0.15;
            z-index: 0;
          }
          .prof-lighting::before {
            width: 500px;
            height: 500px;
            background: #f59e0b;
            top: -200px;
            right: -200px;
          }
          .prof-lighting::after {
            width: 400px;
            height: 400px;
            background: #8b5cf6;
            bottom: -150px;
            left: -150px;
          }
          .content {
            position: relative;
            z-index: 1;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 32px;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 32px;
            font-weight: 600;
          }
          .status-text {
            font-size: 14px;
            color: #a1a1aa;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .status-indicator {
            width: 8px;
            height: 8px;
            background: #f59e0b;
            border-radius: 50%;
            animation: pulse 2s infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
          .adaptive-badge {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(34, 197, 94, 0.1);
            padding: 8px 16px;
            border-radius: 24px;
            border: 1px solid rgba(34, 197, 94, 0.2);
            font-size: 13px;
          }
          .adaptive-indicator {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
          }
          .quick-actions {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
            overflow-x: auto;
            padding-bottom: 8px;
          }
          .action-pill {
            flex-shrink: 0;
            padding: 12px 24px;
            border-radius: 24px;
            border: 1px solid #27272a;
            background: rgba(39, 39, 42, 0.5);
            color: #a1a1aa;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.2s;
            white-space: nowrap;
          }
          .action-pill:hover {
            background: rgba(39, 39, 42, 0.8);
            border-color: #3f3f46;
            color: #fff;
          }
          .action-pill.active {
            background: linear-gradient(135deg, #f59e0b, #f97316);
            color: #fff;
            border-color: transparent;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
          }
          .room-tabs {
            display: flex;
            gap: 8px;
            background: rgba(39, 39, 42, 0.3);
            padding: 8px;
            border-radius: 16px;
            margin-bottom: 24px;
            overflow-x: auto;
          }
          .room-tab {
            padding: 12px 20px;
            border-radius: 12px;
            border: none;
            background: transparent;
            color: #71717a;
            cursor: pointer;
            font-size: 14px;
            white-space: nowrap;
            transition: all 0.2s;
          }
          .room-tab:hover {
            background: rgba(63, 63, 70, 0.3);
            color: #d4d4d8;
          }
          .room-tab.active {
            background: #27272a;
            color: #fff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          }
          .room-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
          }
          .room-card {
            background: rgba(39, 39, 42, 0.3);
            border: 1px solid rgba(63, 63, 70, 0.5);
            border-radius: 20px;
            padding: 20px;
            transition: all 0.2s;
          }
          .room-card:hover {
            border-color: #3f3f46;
            background: rgba(39, 39, 42, 0.5);
          }
          .room-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
          }
          .room-icon {
            width: 48px;
            height: 48px;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            background: rgba(245, 158, 11, 0.1);
          }
          .room-info h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 500;
          }
          .room-info p {
            margin: 4px 0 0 0;
            font-size: 12px;
            color: #71717a;
          }
          .brightness-bar {
            width: 100%;
            height: 6px;
            background: #27272a;
            border-radius: 3px;
            overflow: hidden;
            margin-top: 12px;
          }
          .brightness-fill {
            height: 100%;
            background: linear-gradient(90deg, #f59e0b, #f97316);
            border-radius: 3px;
            transition: width 0.3s;
          }
          
                /* Responsive Design - Phone, Tablet, Laptop */
      
      /* Mobile phones - full width, single column */
      @media (max-width: 767px) {
        .prof-lighting {
          padding: 16px;
          max-width: 100%;
        }
        .room-grid {
          grid-template-columns: 1fr !important;
        }
      }
      
      /* Tablets - constrained width, 2 columns */
      @media (min-width: 768px) and (max-width: 1023px) {
        .prof-lighting {
          max-width: 900px;
          margin: 0 auto;
        }
        .room-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
      
      /* Laptops and desktops - wider but still constrained */
      @media (min-width: 1024px) {
        .prof-lighting {
          max-width: 1200px;
          margin: 0 auto;
        }
        .room-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }
        </style>
        <div class="prof-lighting">
          <div class="content">
            <div class="header">
              <div>
                <h1>Lighting</h1>
                <p class="status-text">
                  <span class="status-indicator"></span>
                  <span>12 lights active</span>
                  <span>•</span>
                  <span>4 rooms</span>
                </p>
              </div>
              <div class="adaptive-badge">
                <span class="adaptive-indicator"></span>
                <span>Adaptive</span>
              </div>
            </div>
            
            <div class="quick-actions">
              <button class="action-pill">☀️ Morning</button>
              <button class="action-pill">🌅 Evening</button>
              <button class="action-pill">🎬 Cinema</button>
              <button class="action-pill">🎉 Party</button>
              <button class="action-pill">🌙 Goodnight</button>
              <button class="action-pill active">⚡ All On</button>
              <button class="action-pill">⭕ All Off</button>
            </div>
            
            <div class="room-tabs">
              <button class="room-tab active">🛋️ Lounge</button>
              <button class="room-tab">🚪 Hallway</button>
              <button class="room-tab">🛏️ Bedroom</button>
              <button class="room-tab">👶 Lucas's Room</button>
              <button class="room-tab">🍳 Kitchen</button>
              <button class="room-tab">🌳 Outside</button>
            </div>
            
            <div class="room-grid" id="roomGrid"></div>
          </div>
        </div>
      `;
      this.appendChild(this.card);
    }
  }

  updateContent() {
    if (!this._hass) return;
    
    const roomGrid = this.querySelector('#roomGrid');
    if (!roomGrid) return;
    
    const rooms = [
      { name: 'Lounge', lights: '6 lights', brightness: 81, icon: '🛋️', color: '#f59e0b' },
      { name: 'Hallway', lights: '3 lights', brightness: 99, icon: '🚪', color: '#f97316' },
      { name: 'Bedroom', lights: '7 lights', brightness: 45, icon: '🛏️', color: '#a855f7' },
      { name: 'Lucas', lights: '5 lights', brightness: 6, icon: '👶', color: '#06b6d4' },
      { name: 'Kitchen', lights: '4 lights', brightness: 89, icon: '🍳', color: '#10b981' },
      { name: 'Bathroom', lights: '3 lights', brightness: 0, icon: '🚿', color: '#6b7280' }
    ];
    
    roomGrid.innerHTML = rooms.map(room => `
      <div class="room-card">
        <div class="room-header">
          <div class="room-icon">${room.icon}</div>
          <div class="room-info">
            <h3>${room.name}</h3>
            <p>${room.lights}</p>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 24px; font-weight: 300;">${room.brightness}%</span>
          <div style="width: 48px; height: 24px; background: ${room.brightness > 0 ? room.color : '#3f3f46'}; border-radius: 12px; position: relative;">
            <div style="position: absolute; ${room.brightness > 0 ? 'right' : 'left'}: 2px; top: 2px; width: 20px; height: 20px; background: white; border-radius: 50%;"></div>
          </div>
        </div>
        <div class="brightness-bar">
          <div class="brightness-fill" style="width: ${room.brightness}%; background: linear-gradient(90deg, ${room.color}, ${room.color}dd);"></div>
        </div>
      </div>
    `).join('');
  }

  getCardSize() {
    return 8;
  }
}

customElements.define('professional-lighting-card', ProfessionalLightingCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'professional-lighting-card',
  name: 'Professional Lighting Card',
  description: 'A professional lighting dashboard card with modern design'
});