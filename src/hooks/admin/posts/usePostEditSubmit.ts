import { useState, useCallback } from 'react';
import { patch, del } from '@/lib/api/http';
import { API_ENDPOINTS } from '@/lib/api/endpoint';
import { PostResponse, PostRequest, PostStatus } from '@/types/api/post';
import { exceptErrorHandling } from '@/lib/utils/exceptErrorHandling';
import { useRouter } from 'next/navigation';
import { PostEditorState } from '@/types/admin/posts';
import { ImagesDeleteResponse } from '@/types/api/imagesDelete';
import { useToastStore } from '@/stores/toastStore';

interface UsePostEditSubmitProps {
  showError: (message: string[]) => void;
  postId: number;
}

function usePostEditSubmit({ showError, postId }: UsePostEditSubmitProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(
    async (state: PostEditorState, status: PostStatus) => {
      setIsLoading(true);
      // 登録する画像ID,削除する画像IDを選別
      // state.images の中から、state.attachedImages に含まれているもの → 登録する画像（既に登録済みなので、リクエストに含める）
      const registerImages = state.images
        .filter((image) => state.attachedImages.includes(image.url))
        .map((image) => image.imageId);

      // state.images の中から、state.attachedImages に含まれていないもの → 削除する画像
      const deleteImages = state.images
        .filter((image) => !state.attachedImages.includes(image.url))
        .map((image) => image.imageId);

      // 削除する画像IDがある場合、削除する
      if (deleteImages.length > 0) {
        for (const id of deleteImages) {
          await del<ImagesDeleteResponse>(API_ENDPOINTS.images.delete(id));
        }
      }

      // リクエストデータを作成
      const request: PostRequest = {
        title: state.title,
        content_md: state.content,
        thumbnail_url: state.thumbnailUrl,
        status: status,
        images: registerImages,
        tags: state.tags,
      };

      try {
        // 投稿を更新（編集画面用）
        await patch<PostResponse>(API_ENDPOINTS.posts.put(postId), request);

        // トーストを表示
        const message =
          status === 'PUBLISHED'
            ? '記事を更新しました'
            : '下書きを更新しました';
        useToastStore.getState().show({
          type: 'success',
          message: message,
        });

        // 更新後、投稿一覧ページにリダイレクト
        router.push('/admin/home');
      } catch (error) {
        exceptErrorHandling(error, showError);
      } finally {
        setIsLoading(false);
      }
    },
    [router, showError, postId]
  );

  return {
    isLoading,
    onSubmit,
  };
}

export default usePostEditSubmit;

