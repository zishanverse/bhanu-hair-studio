import os
import sys
import math
import requests

LOCAL_VIDEO_PATH = r"C:\Users\HP\Downloads\Untitled_Scene_10-16_06_52_45_20261016131325.mp4"
TEMP_VIDEO_PATH = "temp_video.mp4"
OUTPUT_DIR = os.path.join("public", "sequence")
TARGET_FRAMES = 900
WEBP_QUALITY = 76

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    video_input = LOCAL_VIDEO_PATH if os.path.exists(LOCAL_VIDEO_PATH) else TEMP_VIDEO_PATH
    if not os.path.exists(video_input):
        print(f"Downloading video from {VIDEO_URL}...")
        resp = requests.get(VIDEO_URL, stream=True)
        resp.raise_for_status()
        with open(TEMP_VIDEO_PATH, "wb") as f:
            for chunk in resp.iter_content(chunk_size=1024 * 512):
                if chunk:
                    f.write(chunk)
        print("Download complete.")
        video_input = TEMP_VIDEO_PATH
    else:
        print(f"Using video source: {video_input}")

    import cv2
    from PIL import Image

    cap = cv2.VideoCapture(video_input)
    if not cap.isOpened():
        print("Error: Could not open video file.", file=sys.stderr)
        sys.exit(1)

    total_video_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    duration = total_video_frames / fps if fps > 0 else 20.0
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    print(f"Video stats: {total_video_frames} frames, {fps:.2f} FPS, {duration:.2f}s, {width}x{height}")
    print(f"Extracting {TARGET_FRAMES} evenly spaced WebP frames to {OUTPUT_DIR}...")

    # Calculate frame indices to sample
    if total_video_frames <= TARGET_FRAMES:
        indices = list(range(total_video_frames))
    else:
        indices = [int(round(i * (total_video_frames - 1) / (TARGET_FRAMES - 1))) for i in range(TARGET_FRAMES)]

    extracted_count = 0
    current_frame_idx = 0

    target_set = set(indices)
    target_map = {idx: out_idx + 1 for out_idx, idx in enumerate(indices)}

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        if current_frame_idx in target_set:
            out_num = target_map[current_frame_idx]
            out_filename = f"frame_{out_num:04d}.webp"
            out_path = os.path.join(OUTPUT_DIR, out_filename)

            # Convert BGR to RGB
            rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(rgb_frame)
            pil_img.save(out_path, "WEBP", quality=WEBP_QUALITY, method=4)

            extracted_count += 1
            if extracted_count % 25 == 0 or extracted_count == len(indices):
                print(f"Extracted {extracted_count}/{len(indices)} frames ({out_filename})...")

        current_frame_idx += 1

    cap.release()

    # Save manifest
    manifest_path = os.path.join(OUTPUT_DIR, "manifest.json")
    import json
    with open(manifest_path, "w") as f:
        json.dump({
            "totalFrames": extracted_count,
            "width": width,
            "height": height,
            "duration": duration,
            "pattern": "/sequence/frame_{:04d}.webp"
        }, f, indent=2)

    print(f"Successfully generated {extracted_count} WebP frames and manifest.json.")

if __name__ == "__main__":
    main()
