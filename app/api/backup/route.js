import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import Certification from '@/models/Certification';
import Experience from '@/models/Experience';
import Expertise from '@/models/Expertise';
import GeneralSettings from '@/models/GeneralSettings';
import Project from '@/models/Project';
import Skill from '@/models/Skill';

export async function GET(request) {
  await dbConnect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    
    // Check if user is admin
    const adminUser = await User.findById(decoded.id);
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ success: false, error: 'Not authorized as admin' }, { status: 403 });
    }

    // Export all data
    const users = await User.find({});
    const certifications = await Certification.find({});
    const experiences = await Experience.find({});
    const expertises = await Expertise.find({});
    const generalSettings = await GeneralSettings.find({});
    const projects = await Project.find({});
    const skills = await Skill.find({});

    const backupData = {
      timestamp: new Date().toISOString(),
      data: {
        users,
        certifications,
        experiences,
        expertises,
        generalSettings,
        projects,
        skills
      }
    };

    return new NextResponse(JSON.stringify(backupData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="mitan-portfolio-backup-${new Date().toISOString().split('T')[0]}.json"`,
      },
    });

  } catch (error) {
    console.error('Error creating backup:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to create backup' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) return NextResponse.json({ success: false, error: 'Not authorized' }, { status: 401 });
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 });
    
    // Check if user is admin
    const adminUser = await User.findById(decoded.id);
    if (!adminUser || !adminUser.isAdmin) {
      return NextResponse.json({ success: false, error: 'Not authorized as admin' }, { status: 403 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const fileContent = await file.text();
    const parsedData = JSON.parse(fileContent);

    if (!parsedData || !parsedData.data) {
      return NextResponse.json({ success: false, error: 'Invalid backup file format' }, { status: 400 });
    }

    const { data } = parsedData;

    // Clear existing collections and insert new data
    if (data.users && data.users.length > 0) {
      await User.deleteMany({});
      await User.insertMany(data.users);
    }
    
    if (data.certifications && data.certifications.length > 0) {
      await Certification.deleteMany({});
      await Certification.insertMany(data.certifications);
    } else if (data.certifications) {
      await Certification.deleteMany({});
    }

    if (data.experiences && data.experiences.length > 0) {
      await Experience.deleteMany({});
      await Experience.insertMany(data.experiences);
    } else if (data.experiences) {
      await Experience.deleteMany({});
    }

    if (data.expertises && data.expertises.length > 0) {
      await Expertise.deleteMany({});
      await Expertise.insertMany(data.expertises);
    } else if (data.expertises) {
      await Expertise.deleteMany({});
    }

    if (data.generalSettings && data.generalSettings.length > 0) {
      await GeneralSettings.deleteMany({});
      await GeneralSettings.insertMany(data.generalSettings);
    } else if (data.generalSettings) {
      await GeneralSettings.deleteMany({});
    }

    if (data.projects && data.projects.length > 0) {
      await Project.deleteMany({});
      await Project.insertMany(data.projects);
    } else if (data.projects) {
      await Project.deleteMany({});
    }

    if (data.skills && data.skills.length > 0) {
      await Skill.deleteMany({});
      await Skill.insertMany(data.skills);
    } else if (data.skills) {
      await Skill.deleteMany({});
    }

    return NextResponse.json({ success: true, message: 'Database restored successfully' }, { status: 200 });

  } catch (error) {
    console.error('Error restoring database:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to restore database' }, { status: 500 });
  }
}
