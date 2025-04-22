export const NOTIFY_JOB_SUBSCRIPTION = `subscription MySubscription($jobId:String!, $userId:String!) {
      notifyJob(
        jobId: $jobId
        userId: $userId
      ) {
        code
        message
        jobId
        userId
        data {
          jobId
          userId
          ttl
          s3Url
          status
        }
      }
    }`;

export const PRODCUTCOUNT_JOB_SUBSCRIPTION = `subscription MySubscription($jobId:String!) {
   subscribeProductCount(
     jobId: $jobId
   ) {
     code
     message
     jobId
     data 
   }
 }`;