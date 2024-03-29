import {ContentPathItem, fetchContentPathsForLocale, getLocaleProjectConfigById, PROJECT_ID_HEADER} from '@enonic/nextjs-adapter';
import {NextApiRequest, NextApiResponse} from 'next';

interface ResponseData {
    message: string
}

export default async function handler(req: NextApiRequest,
                                      res: NextApiResponse<ResponseData>) {
    const {token, path} = req.query;
    // Check for secret to confirm this is a valid request
    if (token !== process.env.ENONIC_API_TOKEN) {
        // XP hijacks 401 to show login page, so send 407 instead
        return res.status(407).json({message: 'Invalid token'});
    }

    try {
        // Return 200 immediately and do revalidate in background
        res.status(200).json({message: 'Revalidation started'})
        if (!path) {
            console.info('Started revalidating everything...')
            const projectId = req.headers[PROJECT_ID_HEADER] as string | undefined
            const config = getLocaleProjectConfigById(projectId)
            const paths = await fetchContentPathsForLocale('\${site}/', config)
            for (let path of paths){
                const cp = path.params.contentPath
                if (cp[0] === "") {
                    cp[0] = config.locale
                } else {
                    cp.unshift(config.locale)
                }
                if (cp[0] == "default"){
                    cp[0] = "en"
                }
                await revalidatePath(res, cp)
            }
            console.info(`Done revalidating everything`)
        } else {
            await revalidatePath(res, path)
            console.info(`Revalidated [${path}]`)
        }
    } catch (err) {
        console.error(`Revalidation [${path ?? 'everything'}] error: ` + err)
    }
}

async function revalidatePath(res: any, path: string[] | string) {
    let normalPath;
    if (typeof path === 'string') {
        normalPath = path.charAt(0) !== '/' ? '/' + path : path;
    } else {
        normalPath = '/' + path.join('/');
    }
    return res.revalidate(normalPath);
}
