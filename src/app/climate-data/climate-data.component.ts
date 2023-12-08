import { Component, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-climate-data',
  templateUrl: './climate-data.component.html',
  styleUrls: ['./climate-data.component.css']
})
export class ClimateDataComponent implements AfterViewInit, OnDestroy {
  @ViewChild('globeContainer') private containerRef!: ElementRef;

  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private controls!: OrbitControls;
  private animationFrameId!: number;

  ngAfterViewInit(): void {
    this.initThree();
  }

  private initThree(): void {
    // Scene setup
    this.scene = new THREE.Scene();

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 0.1, 1000);
    this.camera.position.z = 5;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.containerRef.nativeElement.clientWidth, this.containerRef.nativeElement.clientHeight);
    this.containerRef.nativeElement.appendChild(this.renderer.domElement);

    // Globe setup
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const globe = new THREE.Mesh(geometry, material);
    this.scene.add(globe);

    // Controls setup
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Lighting setup
   
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('assets/earth_texture.jpg', (texture) => {
      const material = new THREE.MeshPhongMaterial({ map: texture });
      const globe = new THREE.Mesh(new THREE.SphereGeometry(2, 64, 64), material);
      this.scene.add(globe);
    });
    const ambientLight = new THREE.AmbientLight(0x333333, 0.4);
  this.scene.add(ambientLight);

  const sunlight = new THREE.DirectionalLight(0xffffff, 1);
  sunlight.position.set(5, 3, 5);
  this.scene.add(sunlight);

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize, false);

    // Start the animation loop
    this.animate();
  }

  private animate = (): void => {
    this.animationFrameId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private getAspectRatio(): number {
    return this.containerRef.nativeElement.clientWidth / this.containerRef.nativeElement.clientHeight;
  }

  private onWindowResize = (): void => {
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.containerRef.nativeElement.clientWidth, this.containerRef.nativeElement.clientHeight);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.controls.dispose();
    this.scene.clear();
    this.renderer.dispose();
    window.removeEventListener('resize', this.onWindowResize, false);
  }
}
