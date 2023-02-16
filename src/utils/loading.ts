/* eslint-disable @typescript-eslint/ban-types */
import { ElLoading, LoadingParentElement } from 'element-plus'
import { ComponentOptionsBase } from 'vue'

export default class Loading {
  private static count = 0
  private static loading: { close: any; setText?: (text: string) => void; removeElLoadingChild?: () => void; handleAfterLeave?: () => void; vm?: ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}>; $el?: HTMLElement; originalPosition?: Ref<string>; originalOverflow?: Ref<string>; visible?: Ref<boolean>; parent?: Ref<LoadingParentElement>; background?: Ref<string>; svg?: Ref<string>; svgViewBox?: Ref<string>; spinner?: Ref<string | boolean>; text?: Ref<string>; fullscreen?: Ref<boolean>; lock?: Ref<boolean>; customClass?: Ref<string>; target?: Ref<HTMLElement>; beforeClose?: Ref<(() => boolean) | undefined> | undefined; closed?: Ref<(() => void) | undefined> | undefined }
  static show(target = '#app', fullscreen = true, lock = true, text = ''): void {
    if (this.count === 0) {
      this.loading = ElLoading.service({
        lock,
        text,
        background: 'transparent',
        target,
        fullscreen
      })
    }
    this.count++
  }

  static close(): void {
    if (this.count > 0) {
      this.count--
      this.count === 0 && this.loading.close()
    }
  }
}
