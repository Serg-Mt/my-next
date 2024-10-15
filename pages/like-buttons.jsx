import { LikeButton } from '@/components/Like-Button';

export default function LBPage() {
  return <>
    <LikeButton />
    <LikeButton big step="10" />
    <LikeButton start={100} color="blue" />
    <LikeButton bordered/>
  </>

}

