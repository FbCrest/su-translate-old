# test

## Hướng dẫn sửa lỗi

### Lỗi: Prompt dịch trực tiếp vẫn trả về tiếng Trung

Nếu bạn gặp lỗi khi sử dụng prompt "Dịch trực tiếp" nhưng kết quả vẫn là tiếng Trung thay vì tiếng Việt, hãy làm theo các bước sau:

1. **Mở Settings** (⚙️) trong ứng dụng
2. **Chọn tab "Prompts"**
3. **Nhấn nút "🔄 Refresh Prompt"** để force refresh prompt với target language hiện tại
4. **Hoặc nhấn nút "🗑️ Clear Cache"** để xóa cache và refresh prompt
5. **Kiểm tra bằng nút "🐛 Debug"** để xem prompt hiện tại có đúng không

Nếu vẫn không được, hãy:
1. **Chọn lại preset "Dịch trực tiếp"** trong tab Prompts
2. **Nhập "Tiếng Việt"** vào ô target language
3. **Nhấn "Use"** để áp dụng

### Lỗi khác

Nếu gặp lỗi khác, vui lòng:
- Kiểm tra console (F12) để xem thông báo lỗi
- Thử refresh trang
- Xóa cache browser nếu cần thiết

---

## Hướng dẫn thay đổi ID model và tên model Gemini cho toàn bộ project

Nếu bạn muốn thay đổi **id** hoặc **tên hiển thị** của một model Gemini (ví dụ: từ `gemini-2.5-pro` sang `gemini-2.5-pro-v2`), hãy làm theo các bước sau:

### 1. Các file cần sửa và ví dụ dòng code

- **src/components/ModelDropdown.js**
  - Tìm trong mảng modelOptions các dòng như:
    ```js
    { id: 'gemini-2.5-pro', name: t('models.gemini25Pro', 'Gemini 2.5 Pro'), ... }
    ```
    => Thay id hoặc tên trong dòng này.
- **src/components/ModelRetryMenu.js**
  - Tìm trong mảng modelOptions các dòng như:
    ```js
    { id: 'gemini-2.5-pro', name: t('models.gemini25Pro', 'Gemini 2.5 Pro'), ... }
    ```
    => Thay id hoặc tên trong dòng này.
- **src/components/ParallelProcessingStatus.js**
  - Tìm các hàm hoặc nút gọi model, ví dụ:
    ```js
    onRetryWithModel(index, 'gemini-2.5-pro');
    ```
    => Thay id trong tham số hàm.
- **src/components/SettingsModal.js**
  - Tìm trong dropdown:
    ```js
    <option value="gemini-2.5-pro">Gemini 2.5 Pro (Best accuracy, ...)</option>
    ```
    => Thay value hoặc tên hiển thị.
- **src/components/OnboardingModal.js**
  - Tìm trong mảng models:
    ```js
    { id: 'gemini-2.5-pro', name: t('models.gemini25Pro', 'Gemini 2.5 Pro'), ... }
    ```
    => Thay id hoặc tên trong dòng này.
- **(Nếu có):** Các file lưu hoặc đọc model từ localStorage, API, hoặc truyền model vào backend, ví dụ:
    ```js
    localStorage.setItem('gemini_model', 'gemini-2.5-pro');
    ```
    hoặc
    ```js
    const MODEL = localStorage.getItem('gemini_model') || 'gemini-2.5-pro';
    ```

### 2. Cách thay đổi

- **Chỉ thay id:**
  - Thay tất cả các chuỗi `id: 'id-model-cũ'` thành `id: 'id-model-mới'`.
  - Thay tất cả các value, hàm, hoặc logic sử dụng id cũ thành id mới.
- **Thay tên hiển thị:**
  - Thay trường `name: t('models.xxx', 'Tên mới')` hoặc trực tiếp chuỗi tên trong các mảng model.
  - Nếu dùng i18n, cập nhật cả file `src/i18n/locales/en.json` và `src/i18n/locales/vi.json` phần `models`.

### 3. Lưu ý
- Sau khi thay đổi, nên xóa cache trình duyệt hoặc chọn lại model trong phần cài đặt để cập nhật id mới.
- Nếu project có backend sử dụng id model, hãy đồng bộ cả backend nếu cần.

**Ví dụ thay id model:**
- Từ: `id: 'gemini-2.5-pro-exp-03-25'`
- Thành: `id: 'gemini-2.5-pro'`

**Ví dụ thay tên hiển thị:**
- Từ: `name: t('models.gemini25Pro', 'Gemini 2.5 Pro')`
- Thành: `name: t('models.gemini25Pro', 'Gemini 2.5 Pro V2')`

### 4. Cách bật/tắt badge "Đang bảo trì" cho từng model

- Trong file **src/components/OnboardingModal.js** và **src/components/SettingsModal.js**, có object cấu hình:
  ```js
  const maintenanceStatus = {
    'gemini-2.5-pro': false, // Đổi thành true để bật badge Đang bảo trì
    'gemini-2.5-flash-preview-05-20': false,
    'gemini-2.0-flash': false,
    'gemini-2.0-flash-lite': false
  };
  ```
- Để **bật badge Đang bảo trì** cho model nào, chỉ cần đổi giá trị thành `true`.
- Badge này sẽ hiển thị cùng badge cố định (Ưu tiên cao nhất, Khuyên dùng, Dùng ổn định, Dùng trải nghiệm).
- Có thể bật nhiều model cùng lúc nếu muốn.
- Badge bảo trì sẽ tự động đồng bộ UI ở cả OnboardingModal và SettingsModal.

**Ví dụ:**
```js
const maintenanceStatus = {
  'gemini-2.5-pro': true, // Hiện badge Đang bảo trì cho Pro
  'gemini-2.5-flash-preview-05-20': false,
  'gemini-2.0-flash': false,
  'gemini-2.0-flash-lite': true // Hiện badge Đang bảo trì cho Flash Lite
};
```

**Lưu ý:**
- Không cần sửa nhiều chỗ, chỉ đổi giá trị trong object này là đủ.
- Badge bảo trì sẽ luôn hiển thị cạnh badge cố định của model.

### 5. Cách thay badge và icon cho từng model trong bảng Setting (SettingsModal)

- Trong file **src/components/SettingsModal.js**, dropdown chọn model Gemini đã dùng custom component `ModelDropdown` với prop `renderBadge`.
- Để thay badge hoặc icon cho từng model, sửa hàm `renderBadge` như sau:
  ```js
  <ModelDropdown
    ...
    renderBadge={(modelId) => {
      if (modelId === 'gemini-2.5-pro') {
        return <span className="model-badge-premium"><FiAward style={{marginRight:4}}/> Ưu tiên nhất</span>;
      }
      if (modelId === 'gemini-2.5-flash-preview-05-20') {
        return <span className="model-badge-recommend"><FiStar style={{marginRight:4}}/> Khuyên dùng</span>;
      }
      if (modelId === 'gemini-2.0-flash' || modelId === 'gemini-2.0-flash-lite') {
        return <span className="model-badge-maintenance"><FiCpu style={{marginRight:4}}/> Đang bảo trì</span>;
      }
      return null;
    }}
  />
  ```
- Bạn có thể thay đổi điều kiện, nội dung badge, hoặc icon theo ý muốn. Ví dụ:
  ```js
  if (modelId === 'gemini-2.5-pro') {
    return <span className="model-badge-premium"><FiAward/> Best Premium</span>;
  }
  ```
- Badge sẽ tự động hiển thị cạnh tên model trong dropdown.

### 6. Cách thay icon cho từng loại badge trong Setting Modal

- Trong hàm `renderBadge` của `ModelDropdown` ở **src/components/SettingsModal.js**, mỗi loại badge có thể gắn icon khác nhau, ví dụ:
  ```js
  if (/* điều kiện badge 'Ưu tiên nhất' */) {
    return <span className="model-badge-premium"><FiAward/> Ưu tiên nhất</span>;
  }
  if (/* điều kiện badge 'Khuyên dùng' */) {
    return <span className="model-badge-recommend"><FiStar/> Khuyên dùng</span>;
  }
  if (/* điều kiện badge 'Đang bảo trì' */) {
    return <span className="model-badge-maintenance"><FiCpu/> Đang bảo trì</span>;
  }
  ```
- **Muốn đổi icon cho badge nào, chỉ cần thay component icon trong JSX badge đó.**
- Ví dụ đổi icon cho badge "Khuyên dùng":
  ```js
  <span className="model-badge-recommend"><FiThumbsUp/> Khuyên dùng</span>
  ```
- Badge sẽ tự động hiển thị đúng icon cạnh tên model trong dropdown.

**Lưu ý:**
- Icon của các badge ("Ưu tiên nhất", "Khuyên dùng", "Đang bảo trì") trong Onboarding Modal đã được đồng bộ với Setting Modal:
  - Ưu tiên nhất: <FiAward />
  - Khuyên dùng: <FiStar />
  - Đang bảo trì: <FiCpu />
- Nếu muốn đổi icon cho badge nào, hãy sửa JSX ở cả hai file:
  - `src/components/SettingsModal.js` (hàm renderBadge)
  - `src/components/OnboardingModal.js` (phần hiển thị badge cho từng model)

### 7. Badge động cho tất cả các model Gemini (Onboarding & Settings Modal)

- **Badge động**: Badge sẽ tự động đổi theo trạng thái model (mặc định hoặc lấy từ backend/API).
- **Các trạng thái và badge mẫu:**
  - `premium`: <FiAward/> Ưu tiên nhất (tím gradient)
  - `recommended`: <FiStar/> Khuyên dùng (xanh gradient)
  - `maintenance`: <FiCpu/> Đang bảo trì (vàng gradient)
  - `stable`: <FiCheckCircle/> Ổn định (xanh lá gradient)
  - `experimental`: <FiFlask/> Chỉ thử nghiệm (cam/hồng gradient)
- **Cách thêm trạng thái mới:**
  1. Thêm trạng thái vào object `modelStatus` trong cả `SettingsModal.js` và `OnboardingModal.js`.
  2. Thêm điều kiện render badge mới trong prop `renderBadge` (SettingsModal) và trong JSX (OnboardingModal).
  3. Thêm CSS cho class badge mới vào `src/styles/ModelDropdown.css`.
- **Ví dụ code badge động:**
  ```js
  // Trạng thái mặc định hoặc lấy từ API
  const modelStatus = {
    'gemini-2.5-pro': 'premium',
    'gemini-2.5-flash-preview-05-20': 'recommended',
    'gemini-2.0-flash': 'stable',
    'gemini-2.0-flash-lite': 'experimental'
  };
  // Render badge
  if (status === 'premium') {
    return <span className="model-badge-premium"><FiAward/> Ưu tiên nhất</span>;
  }
  if (status === 'recommended') {
    return <span className="model-badge-recommend"><FiStar/> Khuyên dùng</span>;
  }
  if (status === 'maintenance') {
    return <span className="model-badge-maintenance"><FiCpu/> Đang bảo trì</span>;
  }
  if (status === 'stable') {
    return <span className="model-badge-stable"><FiCheckCircle/> Ổn định</span>;
  }
  if (status === 'experimental') {
    return <span className="model-badge-experimental"><FiFlask/> Chỉ thử nghiệm</span>;
  }
  ```
- **CSS badge mới:**
  - Thêm vào `src/styles/ModelDropdown.css` (xem ví dụ các class `.model-badge-premium`, `.model-badge-recommend`, `.model-badge-maintenance`, `.model-badge-stable`, `.model-badge-experimental`).
- **Đồng bộ logic:**
  - Luôn cập nhật logic trạng thái và render badge ở cả hai file: `SettingsModal.js` và `OnboardingModal.js` để giao diện đồng nhất.
- **Thông báo khi chưa có API key:**
  - Khi chưa nhập API key, badge sẽ hiển thị theo trạng thái mặc định và có thông báo nhỏ: "Trạng thái model hiện tại là mặc định. Hãy nhập API key để cập nhật trạng thái mới nhất."

### 8. Cách đổi màu badge cho từng trạng thái

- Mỗi badge có một class CSS riêng (ví dụ: `.model-badge-premium`, `.model-badge-recommend`, `.model-badge-maintenance`, `.model-badge-stable`, `.model-badge-experimental`).
- Để đổi màu badge, chỉ cần sửa thuộc tính `background` (hoặc các thuộc tính màu khác) trong file `src/styles/ModelDropdown.css`.

**Ví dụ đổi màu badge:**
```css
.model-badge-premium {
  background: linear-gradient(90deg, #a259ff 0%, #6a82fb 100%); /* tím gradient */
  color: #fff;
}
.model-badge-recommend {
  background: linear-gradient(90deg, #00c6fb 0%, #005bea 100%); /* xanh gradient */
  color: #fff;
}
.model-badge-maintenance {
  background: linear-gradient(90deg, #ffb347 0%, #ffcc33 100%); /* vàng gradient */
  color: #fff;
}
.model-badge-stable {
  background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%); /* xanh lá gradient */
  color: #fff;
}
.model-badge-experimental {
  background: linear-gradient(90deg, #ffb347 0%, #ff416c 100%); /* cam/hồng gradient */
  color: #fff;
}
```
- **Muốn đổi màu:**
  - Chỉ cần thay mã màu trong thuộc tính `background` của class badge tương ứng.
  - Có thể dùng màu đơn (`background: #a259ff;`) hoặc gradient (`background: linear-gradient(...)`).

**Ví dụ đổi badge "Khuyên dùng" sang màu tím:**
```css
.model-badge-recommend {
  background: linear-gradient(90deg, #a259ff 0%, #6a82fb 100%);
  color: #fff;
}
```

- Đổi màu ở đây sẽ tự động áp dụng cho cả Onboarding Modal và Setting Modal.

---

# Subtitles Generator – Hướng dẫn chỉnh sửa UI chọn model Gemini

## 1. Đồng bộ UI chọn model Gemini (badge, hiệu ứng, màu sắc)

### a. Vị trí cần đồng bộ
- **Tab "Mô hình Gemini" trong SettingsModal** (`src/components/SettingsModal.js`)
- **Chọn model trong OnboardingModal** (`src/components/OnboardingModal.js`)

### b. Cách thêm/sửa badge, màu badge, icon, text badge
- Badge được xác định bởi status: `premium`, `recommended`, `stable`, `experimental`, `maintenance`.
- Mỗi badge có icon riêng (FaCrown, FaStar, FaCheckCircle, FaFlask, FaTools).
- Text badge sửa trong i18n hoặc trực tiếp trong JSX (ví dụ: 'Dùng trải nghiệm').
- Màu badge chỉnh trong CSS:
  - `model-badge-premium`: tím
  - `model-badge-recommend`: xanh lá
  - `model-badge-stable`: xanh dương nhạt
  - `model-badge-experimental`: cam nhạt
  - Badge luôn dùng `color: #fff !important;` và gradient nền.

### c. Cách đồng bộ hiệu ứng chọn (selected), layout, màu sắc
- Khi chọn model, card có nền gradient, viền phát sáng, scale nhẹ, chữ và badge trắng.
- CSS hiệu ứng nằm ở cả `src/styles/SettingsModal.css` và `src/styles/OnboardingModal.css`.
- Đảm bảo class `.onboarding-model-card.selected` và badge `.model-badge-*` giống nhau ở cả hai file.

### d. Cách chỉnh badge không bị xuống dòng, luôn căn giữa với tên model
- Dùng flex cho container chứa h3 và badge:
  ```css
  .onboarding-model-card > div {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: nowrap;
  }
  .onboarding-model-card h3 {
    white-space: nowrap;
    overflow: visible;
    text-overflow: unset;
    max-width: none;
  }
  .model-badge-* {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    color: #fff !important;
  }
  ```
- Badge không nên có height cố định, chỉ padding ngang.

### e. Cách đổi màu badge theo cấp độ
- Sửa trong CSS:
  ```css
  .model-badge-premium { background: linear-gradient(90deg, #a259ff 0%, #6a82fb 100%) !important; }
  .model-badge-recommend { background: linear-gradient(90deg, #43e97b 0%, #38f9d7 100%) !important; }
  .model-badge-stable { background: linear-gradient(90deg, #42a5f5 0%, #478ed1 100%) !important; }
  .model-badge-experimental { background: linear-gradient(90deg, #ffb347 0%, #ff7043 100%) !important; }
  .model-badge-* { color: #fff !important; }
  ```

### f. Cách sửa text badge
- Sửa trực tiếp trong JSX hoặc file i18n:
  - Ví dụ: `{t('onboarding.experimental', 'Dùng trải nghiệm')}`

### g. Lưu ý về CSS
- Luôn dùng `!important` cho `color` và `background` để tránh bị ghi đè.
- Badge và icon luôn màu trắng (`color: #fff !important;`).
- Không dùng height cố định cho badge.

### h. Cách kiểm tra và reload cache khi sửa CSS
- Nhấn Ctrl+F5 để reload mạnh trình duyệt.
- Nếu badge vẫn sai màu, kiểm tra DevTools (F12) > Elements > badge, xem rule nào đang áp dụng.
- Nếu dùng build tool, xóa cache/build rồi build lại.

---

## 2. Thay đổi logic/model mới
- Khi thêm model mới, thêm vào mảng `geminiModels` ở cả SettingsModal và OnboardingModal.
- Thêm status mới nếu cần, đồng bộ badge và màu sắc.

---

## 3. Liên hệ
Nếu gặp lỗi UI badge, hiệu ứng, hoặc muốn tối ưu thêm, hãy liên hệ dev chính hoặc mở issue trên repo.

---

## HƯỚNG DẪN TUỲ BIẾN NỘI DUNG, MÀU CHỮ, ICON CHO MODEL/BADGE TRONG SETTINGS MODAL VÀ ONBOARDING MODAL

### 1. Thay đổi nội dung (text) cho model hoặc badge
- Vào file `src/components/SettingsModal.js` hoặc `src/components/OnboardingModal.js`.
- Tìm mảng models hoặc nơi render badge, sửa trực tiếp text hoặc dùng i18n:
  - Sửa trực tiếp: `name: 'Gemini 2.5 Pro V2'`
  - Dùng i18n: `name: t('models.gemini25Pro', 'Gemini 2.5 Pro')`
- Nếu dùng i18n, sửa file `src/i18n/locales/en.json` và `vi.json` để cập nhật text mới.
- Để đổi text badge, sửa trong hàm render badge hoặc JSX badge:
  ```js
  <span className="model-badge-premium">Ưu tiên nhất</span>
  ```

### 2. Thay đổi màu chữ, màu nền badge
- Mỗi loại badge có class riêng trong file CSS, ví dụ: `src/styles/ModelDropdown.css`.
- Để đổi **màu chữ**:
  ```css
  .model-badge-premium {
    color: #fff; /* Đổi sang màu mong muốn */
  }
  ```
- Để đổi **màu nền** (có thể dùng màu đơn hoặc gradient):
  ```css
  .model-badge-premium {
    background: linear-gradient(90deg, #a259ff 0%, #6a82fb 100%);
  }
  ```
- Tương tự cho các class: `.model-badge-recommend`, `.model-badge-maintenance`, `.model-badge-stable`, `.model-badge-experimental`...

### 3. Thêm hoặc đổi icon cho badge/model
- Icon thường dùng thư viện React Icons (ví dụ: `FiAward`, `FiStar`, `FiCpu`, ...).
- Để đổi icon, sửa trong hàm render badge hoặc JSX badge:
  ```js
  import { FiAward, FiStar, FiCpu, FiFlask } from 'react-icons/fi';
  // ...
  <span className="model-badge-premium"><FiAward style={{marginRight:4}}/> Ưu tiên nhất</span>
  <span className="model-badge-recommend"><FiStar style={{marginRight:4}}/> Khuyên dùng</span>
  <span className="model-badge-maintenance"><FiCpu style={{marginRight:4}}/> Đang bảo trì</span>
  <span className="model-badge-experimental"><FiFlask style={{marginRight:4}}/> Dùng trải nghiệm</span>
  ```
- Muốn đổi icon, chỉ cần thay component icon (ví dụ: đổi `FiStar` thành `FiThumbsUp`).
- Có thể thêm nhiều icon, đổi vị trí icon, hoặc thêm hiệu ứng CSS cho icon nếu muốn.

### 4. Đảm bảo đồng bộ giữa SettingsModal và OnboardingModal
- Khi thay đổi nội dung, màu, icon cho badge/model, nên sửa ở cả hai file để giao diện nhất quán.
- Có thể tách logic render badge ra component riêng để tái sử dụng.

### 5. Xem lại kết quả
- Sau khi sửa, reload lại trang để xem thay đổi.
- Nếu không thấy thay đổi, kiểm tra lại cache trình duyệt hoặc build lại project.

---

# Công dụng các file JS trong thư mục src/components

Dưới đây là mô tả ngắn gọn công dụng của từng file JS trong src/components và các thư mục con:

## src/components/
- **DownloadOptionsModal.js**: Modal chọn tuỳ chọn tải video/phụ đề (chất lượng, định dạng, v.v.).
- **GeminiHeaderAnimation.js**: Hiệu ứng động header Gemini (animation đẹp cho trang chính).
- **Header.js**: Thanh header chính của ứng dụng (logo, menu, v.v.).
- **InputMethods.js**: Chọn phương thức nhập (URL, upload file, tìm kiếm YouTube, v.v.).
- **LanguageSelector.js**: Dropdown chọn ngôn ngữ dịch/phụ đề.
- **LyricsDisplay.js**: Thành phần chính hiển thị và điều khiển timeline, lời, waveform, zoom, v.v.
- **ModelDropdown.js**: Dropdown chọn model Gemini với badge trạng thái.
- **ModelRetryMenu.js**: Menu chọn lại model Gemini khi dịch lỗi hoặc muốn thử lại.
- **OAuth2Callback.js**: Xử lý callback OAuth2 khi đăng nhập Google API.
- **OnboardingModal.js**: Modal onboarding hướng dẫn, chọn model Gemini lần đầu.
- **OutputContainer.js**: Hiển thị kết quả dịch, phụ đề, video preview.
- **ParallelProcessingStatus.js**: Hiển thị trạng thái xử lý song song nhiều tác vụ (dịch, tải, v.v.).
- **PromptEditor.js**: Giao diện chỉnh sửa prompt dịch cho Gemini.
- **SettingsModal.js**: Modal cài đặt chính (API key, model, giao diện, preset, v.v.).
- **SrtUploadButton.js**: Nút upload file SRT phụ đề.
- **SubtitleHideToggle.js**: Bật/tắt hiển thị phụ đề trên video.
- **SubtitleLanguageToggle.js**: Chuyển đổi ngôn ngữ phụ đề (gốc/dịch).
- **SubtitleSettings.js**: Cài đặt chi tiết cho phụ đề (font, màu, vị trí, v.v.).
- **TranslationModal.js**: Modal dịch nhanh, nhập văn bản hoặc file để dịch.
- **TranslationSection.js**: Khu vực hiển thị kết quả dịch (song ngữ, highlight, v.v.).
- **TranslationWarningToast.js**: Toast cảnh báo khi dịch lỗi hoặc có vấn đề.

## src/components/inputs/
- **CustomCheckbox.js**: Checkbox tuỳ biến giao diện.
- **CustomRadio.js**: Radio button tuỳ biến giao diện.
- **CustomSelect.js**: Dropdown select tuỳ biến giao diện.
- **FileUploadInput.js**: Thành phần upload file (video, phụ đề, v.v.).
- **QualitySelector.js**: Chọn chất lượng video tải về.
- **YoutubeSearchInput.js**: Ô tìm kiếm video YouTube.
- **YoutubeUrlInput.js**: Nhập URL video YouTube để tải/dịch.

## src/components/lyrics/
- **LyricItem.js**: Hiển thị một dòng lời (lyric) trên timeline hoặc danh sách.
- **LyricsHeader.js**: Header timeline (ruler thời gian, drag-to-zoom, v.v.).
- **TimelineVisualization.js**: Vẽ timeline, playhead, segment, click-to-seek, zoom, v.v.
- **VolumeVisualizer.js**: Hiển thị waveform âm lượng dưới timeline.

### src/components/lyrics/utils/
- **ColorUtils.js**: Hàm tiện ích xử lý màu cho timeline/lyric.
- **TimelineCalculations.js**: Hàm tính toán vị trí, thời gian, zoom cho timeline.
- **TimelineDrawing.js**: Hàm vẽ các thành phần timeline lên canvas.
- **TimelineInteractions.js**: Xử lý tương tác timeline (kéo, click, zoom, v.v.).

## src/components/previews/
- **SubtitlesPreview.js**: Xem trước phụ đề dạng text.
- **VideoPreview.js**: Xem trước video đã xử lý hoặc video có phụ đề.

---

# Công dụng các file JS trong thư mục src/hooks

- **useLyricsEditor.js**: Custom React hook quản lý logic chỉnh sửa lời (lyrics), undo/redo, đồng bộ với timeline.
- **useSubtitles.js**: Custom React hook quản lý phụ đề (subtitles), đồng bộ hóa, phân đoạn, xử lý import/export.

# Công dụng các file JS trong thư mục src/services

- **geminiService.js**: Giao tiếp với API Gemini, gửi prompt, nhận kết quả dịch, quản lý trạng thái model.
- **googleAuthService.js**: Xử lý xác thực OAuth2 với Google, lấy access token, refresh token.
- **segmentProcessingService.js**: Xử lý phân đoạn video/audio, chia nhỏ để dịch hoặc xử lý song song.
- **youtubeApiService.js**: Giao tiếp với YouTube API, tìm kiếm, lấy thông tin video, phụ đề.
- **youtubeService.js**: Xử lý các thao tác tải, lấy thông tin video YouTube (không qua API chính thức).

# Công dụng các file JS trong thư mục src/utils

- **audioConverter.js**: Chuyển đổi định dạng audio, trích xuất audio từ video.
- **cacheUtils.js**: Tiện ích quản lý cache (bộ nhớ tạm) cho dữ liệu dịch, phụ đề, v.v.
- **colorfulSegmentsOptimizer.js**: Tối ưu hoá phân đoạn timeline với màu sắc nổi bật.
- **durationUtils.js**: Hàm tiện ích xử lý thời lượng, chuyển đổi đơn vị thời gian.
- **fileUtils.js**: Hàm tiện ích thao tác file (đọc, ghi, kiểm tra, v.v.).
- **geminiButtonEffects.js**: Hiệu ứng động cho nút Gemini (animation, particle, v.v.).
- **historyUtils.js**: Quản lý lịch sử dịch, undo/redo, lưu trạng thái.
- **languageUtils.js**: Xử lý ngôn ngữ, mã ngôn ngữ, chuyển đổi tên ngôn ngữ.
- **optimizedVideoStreaming.js**: Tối ưu phát video streaming (buffer, preload, v.v.).
- **schemaUtils.js**: Xác thực, chuyển đổi schema dữ liệu (phụ đề, lyrics, v.v.).
- **segmentManager.js**: Quản lý phân đoạn video/audio cho dịch và timeline.
- **srtParser.js**: Phân tích, chuyển đổi file SRT (phụ đề).
- **structuredJsonParser.js**: Phân tích, xác thực JSON có cấu trúc (cho prompt, phụ đề, v.v.).
- **subtitleConverter.js**: Chuyển đổi giữa các định dạng phụ đề (SRT, VTT, JSON).
- **subtitleParser.js**: Phân tích, chuyển đổi phụ đề nhiều định dạng (SRT, VTT, JSON).
- **subtitleUtils.js**: Hàm tiện ích xử lý phụ đề (cắt, ghép, đồng bộ, v.v.).
- **timeFormatter.js**: Định dạng thời gian (hh:mm:ss, ms, v.v.).
- **timeUtils.js**: Hàm tiện ích thao tác thời gian (so sánh, cộng trừ, v.v.).
- **transcriptionRulesStore.js**: Lưu trữ, quản lý rule chuyển đổi transcript/phụ đề.
- **videoDownloader.js**: Tải video từ nhiều nguồn (YouTube, Douyin, v.v.).
- **videoPreloader.js**: Tiện ích preload video để phát mượt hơn.
- **videoProcessor.js**: Xử lý video (cắt, ghép, chuyển đổi, tối ưu, v.v.).
- **videoSegmenter.js**: Chia nhỏ video thành các segment để xử lý song song.
- **videoSplitter.js**: Cắt video thành nhiều phần nhỏ.
- **videoUtils.js**: Hàm tiện ích thao tác video (lấy info, chuyển đổi, v.v.).
- **vttUtils.js**: Xử lý phụ đề VTT (WebVTT).

## src/utils/geminiEffects/
- **buttonState.js**: Quản lý trạng thái hiệu ứng nút Gemini (hover, active, v.v.).
- **constants.js**: Định nghĩa hằng số cho hiệu ứng Gemini (màu, tốc độ, v.v.).
- **domUtils.js**: Tiện ích thao tác DOM cho hiệu ứng động Gemini.
- **index.js**: Entry point, tổng hợp và export các hàm hiệu ứng Gemini.
- **particleSystem.js**: Quản lý hệ thống particle (hạt động) cho animation Gemini.
- **particleUtils.js**: Hàm tiện ích tạo, cập nhật, render particle cho hiệu ứng Gemini.
- **physicsEngine.js**: Mô phỏng vật lý cho hiệu ứng động Gemini (lực, va chạm, v.v.).
- **physicsUtils.js**: Hàm tiện ích vật lý cho particle/nút Gemini.
- **renderUtils.js**: Hàm vẽ, render hiệu ứng động Gemini lên canvas/SVG.
- **svgUtils.js**: Tiện ích thao tác SVG cho hiệu ứng Gemini.

---